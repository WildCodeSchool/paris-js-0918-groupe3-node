/**** Modules *****/
const express = require("express");
const jwt = require("jsonwebtoken");
const knex = require("../dbconfig");

/**** data Validation *****/

const Ajv = require('ajv');
const ajv = new Ajv();
const postOfferDataIsValid = ajv.compile(require('../ajv/schemas/postOffer'));
const postApplicationDataIsValid = ajv.compile(require('../ajv/schemas/postApplication'));

/**** imports *****/

const getToken = require("../helpers/getToken");
const jwtSecret = require("../secure/jwtSecret");

const router = express.Router();

router
  .route("/")
  /**
   * Posts a new offer for the company,
   * then gets the id of the offer and posts the corresponding questions ids
   * in the offers_questions table.
   *
   * id_companies has to be passed from the token and questions ids as query, comma separated
   * (?questions=1,2,3,4,5,6)
   */
  .post(async (req, res) => {
    console.log(req.body)
    if(!postOfferDataIsValid(req.body)) res.status(400).send('données non valides');
    else {
      const token = getToken(req);
      const decode = jwt.verify(token, jwtSecret);
      if (decode && decode.role === 'companies') {
        // Calculates validity date
        let validUntil = new Date();
        validUntil.setMonth(validUntil.getMonth() + 2);
        // fusing datas from req.body and fix data
        fixData = {
          id: null,
          is_active: true,
          id_companies: decode.id,
          valid_until: validUntil,
          created_at: new Date(),
          updated_at: new Date(),
        };
        const formData = Object.assign(fixData, req.body);
        //Inserting data in offers table
        const resultQuery1 = await knex('offers').insert(formData);
        const offerId = resultQuery1[0];
        const questions = req.query.questions.split(",");
        let questionsValues = [];
        for (let i = 0; i < questions.length; i++) {
          const questionId = questions[i];
          if (/\d+/.test(questionId))
            questionsValues.push(
              {id_offers: offerId, id_questions: questionId}
            );
        }
        await knex('offers_questions').insert(questionsValues);
        res.json({
          offer: {
            id: offerId,
            ...req.body
          },
          questions,
        });
      } else {
        res.sendStatus(401);
      }
    }
  })

  /**
   * Allows to GET offers for a company
   */
  .get(async (req, res) => {
    const token = getToken(req);
    const decode = jwt.verify(token, jwtSecret);
      if (decode && decode.role === 'companies') {
        const result = await knex
          .select('id', 'title', 'description', 'contract_type', 'is_active', 'is_published', 'updated_at')
          .from('offers')
          .where({'id_companies': decode.id, 'is_active': 1});
        res.status(200).send(result)
      } else {
        res.sendStatus(401);
      }
  });

router
  .route("/:id_offer/applications")
  /**
   * Allows a candidate to apply to an offer
   */
  .post(async (req, res) => {
    if (!postApplicationDataIsValid(req.body)) res.status(400).send('données non valides');
    else {
      const token = getToken(req);
      const decode = jwt.verify(token, jwtSecret);
      if (decode && decode.role === 'candidates') {
        try {
          const dataForm = {
            is_sent: req.body.is_sent,
            id_offers: req.params.id_offer,
            id_candidates: decode.id,
            status: "waiting",
            updated_at: new Date(),
            created_at: new Date(),
          };
          const result = await knex('applications').insert(dataForm);
          res.status(201).json(result);
        } catch (error) {
          res.status(400).send('requète impossible');
        }
      } else {
        res.sendStatus(401);
      }
    }
  })

/**
 * Allows to GET answers and some informations on applications for offers when id_companies is verified
 */
  .get(async (req, res) => {
    const token = getToken(req);
    const { id_offer } = req.params;
    const decode = jwt.verify(token, jwtSecret);
    const result = await knex.select('id_companies').from('offers').where({'id': id_offer});
    if(result[0].id_companies === decode.id){
      const result = 
        await knex({
          app: 'applications',
          ans: 'answers',
          q: 'questions',
        }).select({
          id_candidates: 'app.id_candidates', status_application: 'app.status',
          answer_text: 'ans.text', file_link: 'ans.file_link', updated_at: 'ans.updated_at', id_candidates: 'ans.id_candidates',
          question_text: 'q.text',
        }).where({
          'app.id_offers': id_offer,
          'ans.id_offers': id_offer,
          'is_sent': 1
        }).whereRaw('q.id = ans.id_questions')
        .whereRaw('app.id_candidates = ans.id_candidates');
      res.status(200).json(result);
    } else {
      res.sendStatus(401);
    }  
  });

/**
 * Sends the offers that matches the query and the questions Ids
 */
router.get("/search", async (req, res) => {
  const { search, type, place } = req.query;
  const searchLike = search ? `%${search}%` : '%%';
  const placeLike = place ? `%${place}%`: '%%';
  const results = await knex
    .select('id', 'title', 'description', 'contract_type', 'place', 'id_companies', 'updated_at')
    .from('offers')
    .where({'is_active':1, 'is_published':1})
    .andWhere('title', 'like', searchLike)
    .andWhere('place', 'like', placeLike)
  res.status(200).send(results.filter(o => o.contract_type === type || !type || type === 'Tous'));  
});

/**
 * Sends details of an offer from its id and adds the questions ids of the offer
 */
router.get("/details/:id_offer", async (req, res) => {
  const { id_offer } = req.params;
  const resultOffer = 
    await knex.select('title', 'description', 'contract_type', 'place', 'id_companies')
    .from('offers')
    .where({id: id_offer});
  const resultQuestions = await knex.select('id_questions').from('offers_questions').where({id_offers: id_offer});
  res.status(200).json({
    ...resultOffer[0],
    questions: resultQuestions.map(q => q.id_questions),
  });
});


module.exports = router;
