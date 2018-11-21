const express = require('express');
const app = express();
const connection = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.listen(port, (err) => {
  if (err) {
    throw new Error('Connection impossible');
  }

  console.log(`Server is listening on ${port}`);
});
