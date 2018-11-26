/**** imports *****/
const express = require('express');
const connection = require('../config');
const router = express.Router();
const today = new Date();

router.post('/:id_candidates', (req,res) => {
  const dataForm = req.body;
  const { id_offers, id_questions } = req.query;
  connection.query(sql, (err, results) => {

  });
});

module.exports = router;
