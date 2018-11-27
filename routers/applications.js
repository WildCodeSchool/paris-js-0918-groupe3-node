/**** imports *****/
const express = require("express");
const connection = require("../config");
const router = express.Router();

/**
 * Allows to post answers for questions of an offer
 *
 * !!!!! AJOUTER UPLOAD DE FICHIERS !!!!!
 */
router.post("/answer/:id_candidates", (req, res) => {
  const dataForm = {
    ...req.body,
    ...req.query,
    id_candidates: req.params.id_candidates,
    id: null,
    created_at: new Date(),
    updated_at: new Date()
  };
  const { id_offers, id_questions } = req.query;
  const sql = `INSERT INTO answers SET ?`;
  connection.query(sql, dataForm, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json(results);
    }
  });
});


/**
 * Allows to finalize application, post new entry in table application
 */
router.post("/:id_candidates", (req, res) => {
  const dataForm = {
    ...req.query,
    id_candidates: req.params.id_candidates,
    status: "waiting"
  };
  const sql = `INSERT INTO applications SET ?`;
  connection.query(sql, dataForm, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur serveur : ${err}`);
    } else {
      res.json(results);
    }
  });
});



module.exports = router;
