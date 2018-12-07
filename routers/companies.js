/**** imports *****/
const express = require('express');
const connection = require('../config');
const router = express.Router();

router.route('/')
  .post((req, res) => {
    const sql = `SELECT id FROM companies WHERE email = '${req.body.email}'`;
    console.log(sql)
    connection.query(sql, (err, results) => {
      if (err) {
        res.status(500).send(`Erreur serveur : ${err}`)
      } else {
        res.send(results[0])
      }
    });
  })

  // .post((req, res) => {
  //   fixData = {
  //     id: null,
  //     siret: 123456789,
  //     description: 'test',
  //     logo: 'test.png',
  //     link: 'test',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     password: 'testtest',
  //     is_active: true
  //   };

  //   const formData = Object.assign(fixData, req.body);
  //   const sql = 'INSERT INTO companies SET ? ';
  //   connection.query(sql, formData, (err, results) => {
  //     if (err) {
  //       res.status(500).send(`Erreur serveur : ${err}`)
  //     } else {
  //       res.json(results)
  //     }
  //   })
  // })




router.route('/:id_companies')

  .get((req, res) => {
    const sql = `
      SELECT name, siret, description, logo, link, email
      FROM companies
      WHERE is_active
      AND id=?`;
    connection.query(sql, req.params.id_companies, (err, results) => {
      if (err) {
        res.status(500).send(`Erreur serveur : ${err}`)
      } else {
        res.send(results)
      }
    });
  })

  .put((req, res) => {
    const dataForm = req.body;
    const sql = `
    UPDATE companies 
    SET ?
    WHERE id = ?`;
    connection.query(sql, [dataForm, req.params.id_companies], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur serveur : ${err}`)
      } else {
        res.send(req.body)
      }
    });
  });

module.exports = router;
