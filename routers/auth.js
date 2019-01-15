/**** imports *****/
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

const connection = require("../config");
const jwtSecret = require("../secure/jwtSecret");
const router = express.Router();
const getFileExtension = require("../helpers/getFileExtension");
const emailToken = require("../helpers/emailToken");

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
          console.log("VA DANS INSERT", sql);

          if (err) res.status(200).send({ error: err });
          else {
            const tokenInfo = {
              id: results.insertId,
              userType: "companies",
              expiresIn: "1d"
            };
            jwt.sign(tokenInfo, jwtSecret, (err, Token) => {
              console.log("VA DANS TOKEN", Token);

              const to = req.body.email;
              const url = `http://localhost:3002/api/auth/confirmation/${Token}`;
              if (!err) emailToken(to, url);
            });

            res.json({ id: results.insertId });
          }
        });
      }
    });
  });

router.get("/confirmation/:emailToken", (req, res) => {
  const token = req.params.emailToken;
  try {
    console.log("lalilulelo", token);
    jwt.verify(token, jwtSecret, async (error, decode) => {
      if (!error) {
        const userType = decode.userType;
        const id = decode.id;
        const sql = `UPDATE ${userType} SET is_active=1  WHERE id=${id}`;
        await connection.query(sql, (err, results) => {
          console.log("RESULST", results);
          console.log("SQL", sql);

          if (err) results.status(403).send({ error: err });
          else {
            console.log("ALL RIGHT");
          }
        });
      }
    });
  } catch (e) {
    res.send("error");
  }
  return res.json({ validation: "votre demande à bien été prise en compte" });
});

// .get("/confirmation/:emailToken", async (req, res) => {
//   try {
//     const data = { is_active: 1 };
//     const {
//       id: { id }
//     } = jwt.verify(req.params.token, jwtSecret);
//     const {
//       userType: { userType }
//     } = jwt.verify(req.params.token, jwtSecret);
//     const sql = `UPDATE ${userType} SET ? WHERE id =${id}`;
//     await connection.query(sql, data),
//       (err, results) => {
//         if (err) results.status(403).send({ error: err });
//         else {
//           results.sendStatus(200);
//         }
//       };
//   } catch (e) {
//     res.send("error");
//   }
//   return res.json({ is_active: 1 });
// });

router.route("/signup/candidates").post((req, res) => {
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
        is_active: 1,
        password: hash
      };
      const sql = `INSERT INTO candidates SET ?`;

      connection.query(sql, dataForm, (err, results) => {
        if (err) res.status(200).send({ error: err });
        else {
          res.json({ id: results.insertId });
        }
      });
    }
  });
});

module.exports = router;
