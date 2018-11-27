/**** imports *****/
const express = require('express');
const connection = require('../config');
const router = express.Router();
const today = new Date();

router.get('/:id_companies', (req, res) => {
  const sql = `
    SELECT name, siret, description, logo, link, email
    FROM companies
    WHERE is_active
    AND id=?`;
  connection.query(sql, req.params.id_companies, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`)
    } else {
      res.send(results)
    }
  });
});

router.put('/:id_companies', (req, res) => {
  const dataForm = req.body;
  const sql = `
  UPDATE companies 
  SET ?
  WHERE id = ?`;
  connection.query(sql, [dataForm, req.params.id_companies], (err, results) => {
    if (err){
      res.status(500).send(`Erreur serveur : ${err}`)
    } else {
      res.send(req.body)
    }
  });
});

module.exports = router;
