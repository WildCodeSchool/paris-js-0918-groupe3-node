//imports
const express = require('express');
const app = express();
const connection = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

// use
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//routes

app.get('/api/questions', (req, res) => {
  connection.query('SELECT text, is_custom FROM questions WHERE is_custom=false', (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json(results);
    }
  })
})

//launch
app.listen(port, (err) => {
  if (err) {
    throw new Error('Connection impossible');
  }

  console.log(`Server is listening on ${port}`);
});
