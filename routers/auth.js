/**** imports *****/
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

const connection = require("../config");
const getToken = require("../helpers/getToken");
const jwtSecret = require("../secure/jwtSecret");
const router = express.Router();
const getFileExtension = require("../helpers/getFileExtension");
const sendMail = require("../helpers/sendMail");
const tokenSignIN = require("../helpers/mailTemplates/sendTokenSignIn");
const newPassword = require("../helpers/mailTemplates/newPassword");

const emailRegex = require("../secure/emailRegex");

const upload = multer({
  dest: "tmp/",
  fileFilter: (req, file, cb) => {
    if (
      !(
        file.mimetype.includes("image/png") ||
        file.mimetype.includes("image/jpg")
      )
    ) {
      cb(new Error("Mauvais format de fichier"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 3 * 1024 * 1024
  }
});

router
  .route("/signin/:userType")
  /**
   * Sign in for companies. Gets the company id from the email if password matches.
   * Creates a token with jwt
   */
  .post((req, res) => {
    //Gets id and password corresponding to the email
    const sql = `SELECT id, password FROM ?? WHERE email = ?`;
    const sqlData = [req.params.userType, req.body.email];
    connection.query(sql, sqlData, (err, results) => {
      if (err) {
        res.status(500).send(`Erreur serveur : ${err}`);
      } else {
        if (results.length) {
          bcrypt.compare(
            req.body.password,
            results[0].password,
            (cryptErr, match) => {
              if (cryptErr) res.sendStatus(500);
              if (match) {
                // créer token jwt
                const tokenInfo = {
                  name: results[0].name,
                  role: req.params.userType,
                  id: results[0].id
                };
                const token = jwt.sign(tokenInfo, jwtSecret);
                res.header("Access-Control-Expose-Headers", "x-access-token");
                res.set("x-access-token", token);
                res.status(200);
                res.send({
                  info: "user connected",
                  id: results[0].id
                });
              } else {
                res.status(403).send("le mot de passe est incorrect");
              }
            }
          );
        } else {
          res.status(404).send("email inconnu");
        }
      }
    });
  });

router
  .route("/signup/companies")
  /**
   * Sign up
   */
  .post(upload.single("logo"), (req, res) => {
    bcrypt.hash(req.body.password, 10, (crypErr, hash) => {
      if (crypErr) res.sendStatus(500);
      if (!emailRegex.test(req.body.email))
        res.status(403).send("email non valide");
      else {
        const newPath = req.file
          ? "public/logoCompanies/" +
            `logo_${req.body.name
              .trim()
              .replace(" ", "_")}_${Date.now()}.${getFileExtension(
              req.file.mimetype
            )}`
          : "";

        if (req.file) {
          fs.rename(req.file.path, newPath, err => {
            if (err) res.status(500).send(err);
          });
        }

        const dataForm = {
          name: req.body.name,
          siret: req.body.siret,
          link: req.body.link,
          email: req.body.email,
          description: req.body.description,
          id: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: 0,
          password: hash,
          logo: newPath
        };
        const sql = `INSERT INTO companies SET ?`;
        connection.query(sql, dataForm, (err, results) => {
          if (err) res.status(200).send({ error: err });
          else {
            const tokenInfo = {
              id: results.insertId,
              userType: "companies",
              expiresIn: "1d"
            };
            jwt.sign(tokenInfo, jwtSecret, (err, Token) => {
              const to = req.body.email;
              const url = `http://localhost:3002/api/auth/confirmation/${Token}`;
              if (!err) sendMail(tokenSignIN(to, url));
            });

            res.json({ id: results.insertId });
          }
        });
      }
    });
  });

router
  .route("/signup/candidates")

  .post(upload.none(), (req, res) => {
    bcrypt.hash(req.body.password, 10, (crypErr, hash) => {
      if (crypErr) res.sendStatus(500);
      if (!emailRegex.test(req.body.email))
        res.status(403).send("email non valide");
      else {
        const dataForm = {
          email: req.body.email,
          phone: req.body.phone,
          id: null,
          created_at: new Date(),
          updated_at: new Date(),
          is_active: 0,
          password: hash
        };
        const sql = `INSERT INTO candidates SET ?`;

        connection.query(sql, dataForm, (err, results) => {
          if (err) res.status(200).send({ error: err });
          else {
            const tokenInfo = {
              id: results.insertId,
              userType: "candidates",
              expiresIn: "1d"
            };
            jwt.sign(tokenInfo, jwtSecret, (err, Token) => {
              const to = req.body.email;
              const url = `http://localhost:3002/api/auth/confirmation/${Token}`;
              if (!err) sendMail(tokenSignIN(to, url));
              else {
                console.log(err);
              }
            });

            res.json({ id: results.insertId });
          }
        });
      }
    });
  });

/// Allows to set user active=true from the link sent in email  ///

router.route("/confirmation/:emailToken").get((req, res) => {
  const token = req.params.emailToken;
  try {
    jwt.verify(token, jwtSecret, async (error, decode) => {
      if (!error) {
        const userType = decode.userType;
        const id = decode.id;
        const sql = `UPDATE ?? SET is_active=1  WHERE id=?`;
        await connection.query(sql, [userType, id], (err, results) => {
          if (err) results.status(403).send({ error: err });
          else {
          }
        });
      }
    });
  } catch (e) {
    res.send("error");
  }
  return res.redirect(`http://localhost:3000/`);
});

/// Allows to send an email with new token to allow to change the password ///

router
  .route("/newpassword/")

  .get((req, res) => {
    const userType = req.body.userType;
    const email = req.body.email;
    const sql = `SELECT id from ?? WHERE email= ? AND is_active=1`;
    connection.query(sql, [userType, email], (err, results) => {
      if (!err) {
        const tokenInfo = {
          id: results[0].id,
          userType,
          email,
          expiresIn: "1h"
        };
        jwt.sign(tokenInfo, jwtSecret, (err, Token) => {
          const to = email;
          const url = `http://localhost:3000/newpassword/${Token}`;
          if (!err) {
            sendMail(newPassword(to, url));
            res.sendStatus(200);
          } else {
            console.log(err);
          }
        });
      }
    });
  })

  /// Allows to change password ///

  .put((req, res) => {
    const token = getToken(req);
    jwt.verify(token, jwtSecret, (err, decode) => {
      /// Check if user's email in token exists du database ///
      const userType = decode.userType;
      const sqlGet = `SELECT email FROM ?? WHERE id = ?`;
      connection.query(sqlGet, [userType, decode.id], (err, results) => {
        if (!err && results[0].email === decode.email) {
          bcrypt.hash(req.body.password, 10, (crypErr, hash) => {
            if (crypErr) res.sendStatus(500);
            else {
              /// SET the new password ///
              const password = hash;
              const sqlPut = `UPDATE ?? SET ? WHERE id =?`;
              connection.query(
                sqlPut,
                [userType, { password }, decode.id],
                (err, results) => {
                  if (err) {
                    res.status(500).send(`Erreur serveur : ${err}`);
                  } else {
                    res.status(200).send(results.message);
                  }
                }
              );
            }
          });
        } else {
          res.status(401).send(`Erreur : ${err}`);
        }
      });
    });
  });

module.exports = router;
