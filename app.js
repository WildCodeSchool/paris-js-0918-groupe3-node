/**** imports *****/
const express = require('express');
const app = express();
const connection = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3002;

/**** modules use *****/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**** routers *****/

const questions = require('./routers/questions');
const offers = require('./routers/offers');

/**** routes *****/

app.use('/api/questions', questions);
app.use('/api/offers', offers);

/**** listen *****/
app.listen(port, (err) => {
  if (err) {
    throw new Error('Connection impossible');
  }

  console.log(`Server is listening on ${port}`);
});