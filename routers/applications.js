/**** Modules *****/

const express = require("express");
const jwt = require("jsonwebtoken");
const knex = require("../dbconfig");

/**** data Validation *****/

const Ajv = require('ajv');
const ajv = new Ajv();
const answerDataIsValid = ajv.compile(require('../ajv/schemas/answers'));
const sendApplicationDataIsValid = ajv.compile(require('../ajv/schemas/sendApplication'));
const statusApplicationDataIsValid = ajv.compile(require('../ajv/schemas/statusApplication'));

/**** imports *****/

const jwtSecret = require("../secure/jwtSecret");
const getToken = require("../helpers/getToken");
const sendEmail = require("../helpers/sendEmail");
const getOfferDetails = require('../helpers/getOfferDetails');

const router = express.Router();

/**
 * Allows to post answers for questions of an offer
 */
router.route('/answer')
.post(async (req, res) => {
  const token = getToken(req);
  const decode = jwt.verify(token, jwtSecret);
  if (!answerDataIsValid(req.body)) res.status(400).send('données non valides');
  else {
    if (decode) {
      const dataForm = {
        ...req.body,
        id_candidates: decode.id,
        id: null,
        created_at: new Date(),
        updated_at: new Date()
      };
      const result = await knex('answers').insert(dataForm);
      res.status(201).send(result);
    } else {
      res.sendStatus(401);
    }
  }  
});

/**
 * Allow candidate to send an application unsent.
 */
router.route("/send")
  .put(async (req, res) => {
    if(!sendApplicationDataIsValid(req.body)) res.status(400).send('données non valides');
    else {
      const token = getToken(req);
      const { id_offers } = req.body;
      const dataForm = {
        is_sent: 1,
        updated_at: new Date(),
      };
      const decode = jwt.verify(token, jwtSecret);
      if (decode.role === "candidates") {
        const result = await knex('applications').update(dataForm).where({'id_candidates' : decode.id, 'id_offers': id_offers});
        res.status(201).json(result);
      } else {
        res.sendStatus(403);
      }
    }
  });

  /**
   * Allows the company to change status for an application ///
   */
router.route("/status")
  .put(async (req, res) => {
    if (!statusApplicationDataIsValid(req.body)) res.status(400).send('données non valides');
    else {
      const token = getToken(req);
      const { id_candidates, id_offers, status } = req.body;
      const dataForm = {status};
      const decode = jwt.verify(token, jwtSecret);
      const offer = await getOfferDetails(id_offers);
      if (!decode || decode.role !== 'companies' || offer.id_companies !== decode.id) res.sendStatus(401);
      else {
        const result = await knex('applications').update(dataForm).where({'id_candidates': id_candidates, 'id_offers': id_offers});
        if (status === "validated") {
          const companyInfo = await knex.select('email').from('companies').where({id: decode.id});
          const candidateInfo = await knex.select('email', 'phone').from('candidates').where({id: id_candidates});
          sendEmail(companyInfo[0].email, candidateInfo[0], offer);
        }
        res.status(201).json(result);
      }
    }
  });

module.exports = router;
