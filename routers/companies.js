/**** imports *****/
const express = require('express');
const connection = require('../config');
const getToken = require('../helpers/getToken');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../secure/jwtSecret');

const router = express.Router();

router.route('/:id_companies')
  /**
   * Sends company information from the id in params
   */
  .get((req, res) => {
    const token = getToken(req);
    jwt.verify(token, jwtSecret, (err, decode) => {
      const requestId = Number(req.params.id_companies);
      if (!err && decode.id === requestId){
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
      } else {
        res.sendStatus(403)
      }   
    });
  })

  .put((req, res) => {
    const dataForm = req.body;
    const sql = `
    UPDATE companies 
    SET ?
    WHERE id = ?`;
    connection.query(sql, [dataForm, req.params.id_companies], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur serveur : ${err}`)
      } else {
        res.send(req.body)
      }
    });
  });

module.exports = router;
