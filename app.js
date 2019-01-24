/**** imports *****/
require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 3002;
const version = process.env.VERSION;
console.log(version)

/**** modules use *****/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use('/public', express.static('public')); 

/**** routers *****/

const questions = require('./routers/questions');
const offers = require('./routers/offers');
const companies = require('./routers/companies');
const candidates = require('./routers/candidates');
const applications = require('./routers/applications');
const auth = require('./routers/auth');

/**** routes *****/

app.use(`${version}/questions`, questions);
app.use(`${version}/offers`, offers);
app.use(`${version}/companies`, companies);
app.use(`${version}/candidates`, candidates);
app.use(`${version}/applications`, applications);
app.use(`${version}/auth`, auth);

/**** listen *****/
app.listen(port, (err) => {
  if (err) {
    throw new Error('Connection impossible');
  }

  console.log(`Server is listening on ${port}`);
});