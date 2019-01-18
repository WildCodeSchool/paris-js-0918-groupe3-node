/**** modules *****/
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

/**** data Validation *****/

const Ajv = require('ajv');
const ajv = new Ajv();
const signupCompanies = require('../ajv/schemas/signupCompanies');
const signupCandidates = require('../ajv/schemas/signupCandidates');
const companyDataIsValid = ajv.compile(signupCompanies);
const candidateDataIsValid = ajv.compile(signupCandidates);

/**** imports *****/

const knex = require("../dbconfig");
const jwtSecret = require("../secure/jwtSecret");
const getFileExtension = require("../helpers/getFileExtension");
const checkUser = require('../helpers/checkUser');
const upload = require('../helpers/upload');
const sendEmail = require('../helpers/sendEmail');
const getToken = require('../helpers/getToken');
const tokenSignUp = require("../helpers/mailTemplates/sendTokenSignUp");
const newPassword = require('../helpers/mailTemplates/newPassword');

const router = express.Router();

/**
 * @param {String} userType candidates or companies
 * @body {email, password}
 * @returns {Object} status 200 or 403 + Object {role, id}
 */
router.route('/signin/:userType')
  .post(async (req, res) => {
    const { userType } = req.params;
    const { email, password } = req.body;
    const user = await checkUser(email, password, userType);
    if(!user.match) res.sendStatus(401);
    else {
      const tokenInfo = {
        role: userType,
        id: user.id,
      };
      const token = jwt.sign(tokenInfo, jwtSecret);
      res.header("Access-Control-Expose-Headers", "x-access-token");
      res.set("x-access-token", token);
      res.status(200);
      res.send(tokenInfo);
    }
  });

router.route('/signup/companies')
  .post(upload.single('logo'), async (req, res) => {
    const { name, siret, link, email, description, password } = req.body;
    if (!companyDataIsValid(req.body))
      res.status(400).send("données non valides");
    else {
      try {
        const hash = await bcrypt.hash(password, 10);
        const newPath = 
          req.file ?
          `public/logoCompanies/logo_${name.trim().replace(" ", "_")}_${Date.now()}.${getFileExtension(req.file.mimetype)}`:
          '';
        const dataForm = {name, siret, logo:newPath, link, email, description, password: hash, is_active:0, id: null, created_at: new Date(), updated_at: new Date()};
        if (req.file) {
          fs.rename(req.file.path, newPath, err => {
            if (err) console.log(err);
          });
        }
        const results = await knex('companies').insert(dataForm);
        const tokenInfo = {
          id: results[0],
          role: 'companies',
          expiresIn: '1d',
        }
        const token = jwt.sign(tokenInfo, jwtSecret);
        sendEmail(tokenSignUp(email, `http://localhost:3002/api/auth/confirmation/${token}`));
        res.status(201).send(results);
      } catch(error) {
        console.log(error)
        res.status(400).send(error);
      }
    }
  });

router.route('/signup/candidates')
  .post(upload.none(), async (req, res) => {
    const { password, email, phone } = req.body;
    if (!candidateDataIsValid(req.body))
      res.status(400).send("données non valides");
    else {
      try {
        const hash = await bcrypt.hash(password, 10);
        const dataForm = {email, phone, password: hash, id: null, is_active: 1, created_at: new Date(), updated_at: new Date()};
        const result = await knex('candidates').insert(dataForm);
        res.status(201).send(result);
      } catch (error) {
        res.sendStatus(400);
      }
    }
  });

router.route('/confirmation/:token')
  .get(async (req, res) => {
    const { token } = req.params;
    const decode = jwt.verify(token, jwtSecret);
    if (!decode) res.sendStatus(403);
    else {
      const { role, id } = decode;
      await knex(role).update({'is_active':1}).where({'id': id});
      res.redirect('http://localhost:3000');
    }
  });

router.route('/newPassword')
  .post(async (req, res) => {
    try {
      const {email, userType} = req.body;
      const result = await knex.select('id').from(userType).where({'email': email, 'is_active':1});
      const tokenInfo = {
        id: result[0].id,
        userType,
        email,
        expiresIn: '1h',
      };
      const token = jwt.sign(tokenInfo, jwtSecret);
      sendEmail(newPassword(email, `http://localhost:3000/newpassword/${token}`));
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  })

  .put(async (req, res) => {
    const token = getToken(req);
    const decode = jwt.verify(token, jwtSecret);
    const { userType, id, email } = decode;
    const { password } = req.body;
    const result = await knex.select('email').from(userType).where({'id': id});
    if(result[0].email === email) {
      const hash = await bcrypt.hash(password, 10);
      await knex(userType).update({password: hash}).where({'id': id});
      res.sendStatus(201);
    } else {
      res.sendStatus(401);
    }
  })


module.exports = router;
