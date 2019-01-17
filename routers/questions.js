/**** imports *****/
const express = require('express');
const knex = require('../dbconfig');

/**** data Validation *****/

const Ajv = require('ajv');
const ajv = new Ajv();
const postQuestionDataIsValid = ajv.compile(require('../ajv/schemas/postQuestion'));

const router = express.Router();


/**
 * Sends original questions only.
 */
router.get('/originals', async (req, res) => {
  const results = await knex.select('id', 'text').from('questions').where({is_custom:0});
  res.json(results);
});

/**
 * Sends the text of the question from its id
 */
router.get('/:id_question', async (req,res) => {
  const { id_question } = req.params;
  const result = await knex.select('text').from('questions').where({id:id_question});
  res.json(result[0]);
});

/**
 * Posts a new custom question and sends the id and the text of the question.
 */
router.post('/', async (req, res) => {
  if(!postQuestionDataIsValid(req.body)) res.status(400).send('données non valides');
  else {
    const formData = {
      id: null,
      text: req.body.text,
      is_custom: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
    const results = await knex('questions').insert(formData);
    res.status(201).json({
      id: results[0],
      text: formData.text
    });
  }
});

module.exports = router;
