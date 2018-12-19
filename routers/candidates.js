/**** imports *****/
const express = require('express');
const connection = require('../config');
const getToken = require('../helpers/getToken');

const router = express.Router();

router.route('/:id_candidates')
  /**
   * Sends company information from the id in params
   */
  .get((req, res) => {
    const token = getToken(req);
    jwt.verify(token, jwtSecret, (err, decode) => {
      if (!err && decode.id === req.params.id_candidates){
        const sql = `
        SELECT email, phone
        FROM candidates
        WHERE is_active
        AND id=?`;
        connection.query(sql, req.params.id_candidates, (err, results) => {
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
    UPDATE candidates 
    SET ?
    WHERE id = ?`;
    connection.query(sql, [dataForm, req.params.id_candidates], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur serveur : ${err}`)
      } else {
        res.send(req.body)
      }
    });
  });

module.exports = router;
