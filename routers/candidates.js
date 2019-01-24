/**** Modules *****/

const express = require("express");
const jwt = require("jsonwebtoken");
const knex = require("../db/knex");

/**** data Validation *****/

const Ajv = require('ajv');
const ajv = new Ajv();
const putDataIsValid = ajv.compile(require('../ajv/schemas/putCandidate'));

/**** imports *****/

const getToken = require("../helpers/getToken");
const jwtSecret = require("../secure/jwtSecret");

const router = express.Router();

router
  .route("/")
  /**
   * Sends candidate information from the id in Token
   */
  .get(async (req, res) => {
    const token = getToken(req);
    const decode = jwt.verify(token, jwtSecret);
    if (decode && decode.role === 'candidates') {
      const results = await knex.select('email', 'phone').from('candidates').where({is_active:1, id: decode.id});
      res.status(200).send(results);
    } else {
      res.sendStatus(401);
    }
  })

  .put(async (req, res) => {
    if (!putDataIsValid(req.body)) res.status(400).send('données non valides');
    else {
      const token = getToken(req);
      const decode = jwt.verify(token, jwtSecret);
      if (decode && decode.role === 'candidates') {
        const dataForm = req.body;
        const result = await knex('candidates').update(dataForm).where({id: decode.id});
        res.status(201).json(result);
      } else {
        res.sendStatus(401);
      }
    }
  });

router.route('/applications')
  /**
   * Sends applications of user from id in token.
   */
  .get(async (req, res) => {
    const token = getToken(req);
    const decode = jwt.verify(token, jwtSecret);
    if (!decode || decode.role !== 'candidates') res.sendStatus(401);
    else {
      const result = await knex({
        a: 'applications',
        o: 'offers',
        c: 'companies'
      }).select({
        id_offers: 'a.id_offers', status: 'a.status', applicationUpdated_at: 'a.updated_at',
        title: 'o.title', description: 'o.description', contract_type: 'o.contract_type', offerUpdated_at: 'o.updated_at', id_companies: 'o.id_companies',
        companyName: 'c.name', logo: 'c.logo',
      }).where({
        'a.id_candidates': decode.id,
        'a.is_sent': 1,
      }).whereRaw('a.id_offers = o.id')
      .whereRaw('o.id_companies = c.id');
      res.status(200).json(result);
    }
  });

router.route('/offer:id_offer/answers')
  .get(async (req, res) => {
    const token = getToken(req);
    const { id_offer } = req.params;
    const decode = jwt.verify(token, jwtSecret)
    if (!decode || decode.role !== 'candidates') res.sendStatus(401);
    else {
      const result = await knex({
        a: 'answers',
        q: 'questions'
      }).select({
        answer: 'a.text',
        file_link: 'a.file_link',
        question: 'q.text',
      }).where({
        'a.id_candidates': decode.id,
        'a.id_offers': id_offer,
      }).whereRaw('a.id_questions = q.id');
      res.status(200).json(result);
    }
  });

module.exports = router;
