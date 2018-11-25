/**** imports *****/
const express = require('express');
const app = express();
const connection = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3002;

let today = new Date();

/**** use *****/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**** routes *****/

/**
 * Sends original questions only.
 */
app.get('/api/questions', (req, res) => {
  const sql = `SELECT text, is_custom FROM questions WHERE is_custom=false`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json(results);
    }
  })
})

/**
 * Posts a new custom question and sends the id and the text of the question.
 */
app.post('/api/questions', (req, res) => {
  const formData = {
    id : null,
    text : req.body.text,
    is_custom : true,
    created_at : today,
    updated_at : today
  }
  const sql = `INSERT INTO questions SET ?`;

  connection.query(sql, formData, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json({
        id: results.insertId,
        text: question
      });
    }
  })
});

/**
 * Posts a new offer for the company, 
 * then gets the id of the offer and posts the corresponding questions ids 
 * in the offers_questions table.
 * 
 * id_companies has to be passed as params and questions ids as query, comma separated
 * (?questions=1,2,3,4,5,6)
 */
app.post('/api/offers/:id_companies', (req, res) => {
  // Calculates validity date
  let validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 2);

  // fusing datas from req.body and fix data
  fixData = {
    id : null,
    is_active : true,
    id_companies : req.params.id_companies,
    valid_until : validUntil,
    created_at : today,
    updated_at : today
  }
  const formData = Object.assign(fixData ,req.body);

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
 * Sends the offers that match the query
 */
app.get('/api/offers', (req, res) => {
  const { search, type, place } = req.query;
  searchEsc = connection.escape(`%${search}%`)
  typeEsc = connection.escape(type)
  placeEsc = connection.escape(`%${place}%`);
  const sql =`
    SELECT title, description, contract_type, place 
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

/**** listen *****/
app.listen(port, (err) => {
  if (err) {
    throw new Error('Connection impossible');
  }

  console.log(`Server is listening on ${port}`);
});