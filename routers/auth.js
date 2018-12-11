/**** imports *****/
const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../config');
const router = express.Router();

router.route('/signin/:userType')
  /**
   * Sign in for companies. Gets the company id from the email if password matches.
   */
  .post((req, res) => {
    const sql = `SELECT id, password FROM ?? WHERE email = ?`;
    const sqlData = [req.params.userType, req.body.email];
    connection.query(sql, sqlData , (err, results) => {
      if (err) {
        res.status(500).send(`Erreur serveur : ${err}`)
      } else {
        if (results.length){
          bcrypt.compare(req.body.password, results[0].password, (cryptErr, match) => {
            if (cryptErr) res.sendStatus(500);
            if (match) {
              // créer token jwt
              res.send({
                id: results[0].id
              })
            } else {
              res.status(403).send('le mot de passe est incorrect')
            }
          });
        } else {
          res.status(403).send('email inconnu')
        }               
      }
    });
  })

router.route('/signup/:userType')
/**
 * Sign up 
 */
  .post((req, res) => {
    bcrypt.hash(req.body.password, 10, (crypErr, hash) => {
      if (crypErr) res.sendStatus(500)
      const dataForm = {
        ...req.body,
        id : null,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: 1,
        password: hash
      };
      const sql = `INSERT INTO ?? SET ?`;
      const sqlData = [req.params.userType, dataForm];
      connection.query(sql, sqlData, (err, results) => {
      if (err) res.status(200).send({error : err})
      else {
        res.json({id: results.insertId})
      }
    });
    });
  })

module.exports = router;
