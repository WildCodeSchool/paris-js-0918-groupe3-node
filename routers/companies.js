/**** Modules *****/
const express = require("express");
const jwt = require("jsonwebtoken");
const knex = require("../db/knex");
const bcrypt = require("bcrypt");

/**** data Validation *****/

const Ajv = require('ajv');
const ajv = new Ajv();
const putDataIsValid = ajv.compile(require('../ajv/schemas/putCompanies'));

/**** imports *****/

const getToken = require("../helpers/getToken");
const jwtSecret = require("../secure/jwtSecret");

const router = express.Router();

router
  .route("/")
  /**
   * Sends company information from the id in Token
   */
  .get(async (req, res) => {
    const token = getToken(req);
    const decode = jwt.verify(token, jwtSecret)
    if (decode && decode.role === "companies") {
      const result = await knex
        .select('name', 'siret', 'description', 'logo', 'link', 'email')
        .from('companies')
        .where({
          'is_active': 1,
          'id': decode.id,
        });
      res.status(200).send(result);
    } else {
      res.status(401).json({ token });
    }
  })

  .put(async (req, res) => {
    if (!putDataIsValid(req.body)) res.status(400).send('données non valides');
    else {
      const dataForm = {...req.body, updated_at: new Date()};
      if (req.body.password) 
        dataForm.password = await bcrypt.hash(req.body.password, 10);
      const token = getToken(req);
      const decode = jwt.verify(token, jwtSecret);
      if (decode && decode.role === 'companies') {
        const result = await knex('companies').update(dataForm).where({'id': decode.id});
        res.status(201).json({
          result,
          updated : req.body,
        });
      } else {
        res.sendStatus(401);
      }
    }
  });

module.exports = router;
