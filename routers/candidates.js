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
   * Sends candidate information from the id in Token
   */
  .get((req, res) => {
    const token = getToken(req);
    jwt.verify(token, jwtSecret, (err, decode) => {
  
      
      if (!err) {
        const sql = `
        SELECT email, phone
        FROM candidates
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
        res.sendStatus(403);
      }
    });
  })

  .put((req, res) => {
    const token = getToken(req);
    jwt.verify(token, jwtSecret, (err, decode) => {
      
      if (!err) {
        const dataForm = req.body;
        const sql = `
    UPDATE candidates 
    SET ?
    WHERE id = ?`;
        connection.query(
          sql,
          [dataForm, decode.id],
          (err, results) => {
            if (err) {
              res.status(500).send(`Erreur serveur : ${err}`);
            } else {
              res.send(results);
            }
          }
        );
      } else {
        res.sendStatus(403);
      }
    });
  });

  router.route('/applications')
  /**
   * Sends applications of user from id in token.
   */
  .get((req, res) => {
    const token = getToken(req);
    jwt.verify(token, jwtSecret, (err, decode) => {
      if (err || decode.role !== 'candidates') res.sendStatus(403);
      else {
        const sql = `
          SELECT 
            a.id_offers, a.status, a.updated_at, 
            o.title, o.description, o.contract_type, o.updated_at, o.id_companies,
            c.name, c.logo
          FROM applications a, offers o, companies c
          WHERE a.id_candidates = ? AND a.is_sent
          AND a.id_offers = o.id
          AND o.id_companies = c.id;`
        connection.query(sql, decode.id, (err, results) => {
          if (err) res.status(500).send(err);
          else {
            res.send(results)
          }
        });
      }
    });
  });

  router.route('/offer:id_offer/answers')
    .get((req,res) => {
      const token = getToken(req);
      const { id_offer } = req.params;
      jwt.verify(token, jwtSecret, (err, decode) => {
        if (err || decode.role !== 'candidates') res.sendStatus(403);
        else {
          const sql = `
          SELECT a.text, a.file_link, q.text
          FROM answers a, questions q
          WHERE a.id_candidates = ?
          AND a.id_offers = ?
          AND a.id_question = q.id;`;
          connection.query(sql, [decode.id, id_offer], (err, results) => {
            if (err) res.sendStatus(500);
            else {
              res.status(200).send(results);
            }
          });
        }
      });
    });

module.exports = router;
