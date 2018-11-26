/**** imports *****/
const express = require('express');
const connection = require('../config');
const router = express.Router();
const today = new Date();

/**
 * Sends original questions only.
 */
router.get('/originals', (req, res) => {
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
 * Sends the text of the question from its id
 */
router.get('/:id_question', (req,res) => {
  const sql = `SELECT text FROM questions WHERE id= ?`;
  connection.query(sql, req.params.id_question, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`)
    }else{
      res.json(results[0])
    }
  });
});

/**
 * Posts a new custom question and sends the id and the text of the question.
 */
router.post('/', (req, res) => {
  const formData = {
    id: null,
    text: req.body.text,
    is_custom: true,
    created_at: today,
    updated_at: today
  }
  const sql = `INSERT INTO questions SET ?`;

  connection.query(sql, formData, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json({
        id: results.insertId,
        text: formData.text
      });
    }
  })
});

module.exports = router;
