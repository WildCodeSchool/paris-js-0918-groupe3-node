/**** imports *****/
const express = require("express");
const connection = require("../config");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = require("../secure/jwtSecret");

/**
 * Allows to post answers for questions of an offer
 *
 * !!!!! AJOUTER UPLOAD DE FICHIERS !!!!!
 */
router.post("/answer", (req, res) => {
  const token = getToken(req);
  jwt.verify(token, jwtSecret, (err, decode) => {
   
    if (!err) {
      const dataForm = {
        ...req.body,
        id_candidates: decode.id,
        id: null,
        created_at: new Date(),
        updated_at: new Date()
      };
      const sql = `INSERT INTO answers SET ?`;
      connection.query(sql, dataForm, (err, results) => {
        if (err) {
          res.status(500).send(`Erreur serveur : ${err}`);
        } else {
          res.json(results);
        }
      });
    } else {
      res.sendStatus(403);
    }
  });
});



module.exports = router;
