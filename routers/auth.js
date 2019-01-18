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
// const sendEmail = require("../helpers/sendEmail");
// const tokenSignIN = require("../helpers/mailTemplates/sendTokenSignIn");
// const newPassword = require("../helpers/mailTemplates/newPassword");

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
        const dataForm = {name, siret, logo:newPath, link, email, description, password: hash, is_active:1, id: null, created_at: new Date(), updated_at: new Date()};
        if (req.file) {
          fs.rename(req.file.path, newPath, err => {
            if (err) console.log(err);
          });
        }
        const results = await knex('companies').insert(dataForm);
        res.status(201).send(results);
        // if (!err) sendMail(tokenSignIN(to, url));
      } catch(error) {
        res.status(400).send(error);
      }
    }
  });

router.route('/signup/candidates')
  .post(async (req, res) => {
    const { password, email, phone } = req.body;
    if (!candidateDataIsValid(req.body))
      res.status(400).send("données non valides");
    else {
      try {
        const hash = await bcrypt.hash(password, 10);
        const dataForm = {email, phone, password: hash, id: null, is_active: 1, created_at: new Date(), updated_at: new Date()};
        const result = await knex('candidates').insert(dataForm);
        res.status(201).send(result);
         // if (!err) sendMail(tokenSignIN(to, url));
      } catch (error) {
        res.sendStatus(400);
      }
    }
  });


// /// Allows to set user active=true from the link sent in email  ///

// router.route("/confirmation/:emailToken").get((req, res) => {
//   const token = req.params.emailToken;
//   try {
//     jwt.verify(token, jwtSecret, async (error, decode) => {
//       if (!error) {
//         const userType = decode.userType;
//         const id = decode.id;
//         const sql = `UPDATE ?? SET is_active=1  WHERE id=?`;
//         await connection.query(sql, [userType, id], (err, results) => {
//           if (err) results.status(403).send({ error: err });
//           else {
//           }
//         });
//       }
//     });
//   } catch (e) {
//     res.send("error");
//   }
//   return res.redirect(`http://localhost:3000/`);
// });

// /// Allows to send an email with new token to allow to change the password ///

// router
//   .route("/newpassword/")

//   .post((req, res) => {
//     const userType = req.body.userType;
//     const email = req.body.email;
//     const sql = `SELECT id from ?? WHERE email= ? AND is_active=1`;
//     connection.query(sql, [userType, email], (err, results) => {
//       if (!err) {
//         const tokenInfo = {
//           id: results[0].id,
//           userType,
//           email,
//           expiresIn: "1h"
//         };
//         jwt.sign(tokenInfo, jwtSecret, (err, Token) => {
//           const to = email;
//           const url = `http://localhost:3000/newpassword/${Token}`;
//           if (!err) {
//             sendMail(newPassword(to, url));
//             res.sendStatus(200);
//           } else {
//             console.log(err);
//           }
//         });
//       }
//     });
//   })

//   /// Allows to change password ///

//   .put((req, res) => {
//     const token = getToken(req);
//     jwt.verify(token, jwtSecret, (err, decode) => {
//       /// Check if user's email in token exists du database ///
//       const userType = decode.userType;
//       const sqlGet = `SELECT email FROM ?? WHERE id = ?`;
//       connection.query(sqlGet, [userType, decode.id], (err, results) => {
//         if (!err && results[0].email === decode.email) {
//           bcrypt.hash(req.body.password, 10, (crypErr, hash) => {
//             if (crypErr) res.sendStatus(500);
//             else {
//               /// SET the new password ///
//               const password = hash;
//               const sqlPut = `UPDATE ?? SET ? WHERE id =?`;
//               connection.query(
//                 sqlPut,
//                 [userType, { password }, decode.id],
//                 (err, results) => {
//                   if (err) {
//                     res.status(500).send(`Erreur serveur : ${err}`);
//                   } else {
//                     res.status(200).send(results.message);
//                   }
//                 }
//               );
//             }
//           });
//         } else {
//           res.status(401).send(`Erreur : ${err}`);
//         }
//       });
//     });
//   });



module.exports = router;
