/**** imports *****/
const express = require('express');
const connection = require('../config');
const router = express.Router();
const today = new Date();

/**
 * Posts a new offer for the company, 
 * then gets the id of the offer and posts the corresponding questions ids 
 * in the offers_questions table.
 * 
 * id_companies has to be passed as params and questions ids as query, comma separated
 * (?questions=1,2,3,4,5,6)
 */
router.post('/:id_companies', (req, res) => {
  // Calculates validity date
  let validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 2);

  // fusing datas from req.body and fix data
  fixData = {
    id: null,
    is_active: true,
    id_companies: req.params.id_companies,
    valid_until: validUntil,
    created_at: today,
    updated_at: today
  }
  const formData = Object.assign(fixData, req.body);

  //Inserting data in offers table
  const sqlOffer = `INSERT INTO offers SET ?`;
  connection.query(sqlOffer, formData, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      //Inserting data in offers_questions table
      const offerId = results.insertId;
      const questions = req.query.questions.split(',');
      let sqlQuestionsValues = [];
      for (let i = 0; i < questions.length; i++) {
        const questionId = questions[i];
        if (/\d+/.test(questionId))
          sqlQuestionsValues.push(`(${offerId}, ${connection.escape(questionId)})`);
      }

      const sqlQuestions = `
          INSERT INTO offers_questions (id_offers, id_questions) 
          VALUES ${sqlQuestionsValues.join(`, `)}`;
      connection.query(sqlQuestions, (err2, results2) => {
        console.log(sqlQuestions)
        if (err2) {
          res.status(500).send(`Erreur serveur : ${err2}`);
        } else {
          res.json(results2)
        }
      })
    }
  })
})

/**
 * Sends the offers that match the query and the questions Ids
 */
router.get('/', (req, res) => {
  const { search, type, place } = req.query;
  searchEsc = connection.escape(`%${search}%`)
  typeEsc = connection.escape(type)
  placeEsc = connection.escape(`%${place}%`);
  const sql = `
      SELECT title, description, contract_type, place, id_companies
      FROM offers 
      WHERE is_active=1
      AND is_published=1
      ${search ? 'AND title LIKE' + searchEsc : ''}
      ${place ? 'AND place LIKE' + placeEsc : ''}
      ${type ? 'AND contract_type=' + typeEsc : ''}
      `;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json(results);
    }
  })
})

router.get('/details/:id_offers', (req, res) => {
  const sqlOffer = `
    SELECT title, description, contract_type, place, id_companies
    FROM offers
    WHERE id = ?`;
  const { id_offers } = req.params;
  connection.query(sqlOffer, id_offers, (errOffer, resultsOffer) => {
    if (errOffer) {
      res.status(500).send(`Erreur serveur : ${errOffer}`);
    } else {
      const sqlQuestions = `
        SELECT id_questions 
        FROM offers_questions
        WHERE id_offers= ?`;
      connection.query(sqlQuestions, id_offers, (errQuestions, resultsQuestions) => {
        if (errQuestions) {
          res.status(500).send(`Erreur serveur : ${errQuestions}`);
        } else {
          res.json({
            ...resultsOffer[0],
            questions : resultsQuestions.map(q=>q.id_questions)
          });
        }
      });
    }
  });
});

module.exports = router;
