/**** imports *****/
const express = require('express');
const app = express();
const connection = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3001;

const formatDate = (date) => `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`;

let today = formatDate(new Date());

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
  connection.query('SELECT text, is_custom FROM questions WHERE is_custom=false', (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json(results);
    }
  })
})

/**
 * Posts a new custom question and send the id and the text of the question.
 */
app.post('/api/questions', (req, res) => {
  const question = req.body.text;
  const url = `INSERT INTO questions VALUES (null, ?, true, ${today}, ${today})`;
  connection.query(url, question, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json({id : results.insertId, text: question});
    }
  })
});

/**
 * Posts a new offer for the company and sends it back as a json.
 */
app.post('/api/offers/:id_companies', (req, res) => {
  let validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 2);
  validUntil = formatDate(validUntil);
  const url = `INSERT INTO offers VALUES (null, ?, ?, ?, true, ?, ${validUntil}, ${today}, ${today}, ${req.params.id_companies})`;
  const { title, description, contract_type, is_published } = req.body;
  connection.query(url, [title, description, contract_type, is_published], (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json(req.body);
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
