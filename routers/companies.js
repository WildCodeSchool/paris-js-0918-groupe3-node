/**** imports *****/
const express = require("express");
const connection = require("../config");
const getToken = require("../helpers/getToken");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../secure/jwtSecret");

const router = express.Router();

router
  .route("/")
  /**
   * Sends company information from the id in Token
   */
  .get((req, res) => {
    const token = getToken(req);
    jwt.verify(token, jwtSecret, (err, decode) => {
      if (!err) {
        const sql = `
        SELECT name, siret, description, logo, link, email
        FROM companies
        WHERE is_active
        AND id=?`;
        connection.query(sql, decode.id, (err, results) => {
          if (err) {
            res.status(500).send(`Erreur serveur : ${err}`);
          } else {
            res.send(results);
          }
        });
      } else {
        res.status(403).json({ token });
      }
    });
  })

  .put((req, res) => {
    const dataForm = req.body;
    const sql = `
    UPDATE companies 
    SET ?
    WHERE id = ?`;
    connection.query(
      sql,
      [dataForm, req.params.id_companies],
      (err, results) => {
        if (err) {
          res.status(500).send(`Erreur serveur : ${err}`);
        } else {
          res.send(req.body);
        }
      }
    );
  });

module.exports = router;
