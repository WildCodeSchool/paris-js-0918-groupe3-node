require("dotenv").config();
const password = process.env.DB_PASS;

module.exports = require('knex')({
    client: 'mysql',
    connection: {
    host : 'localhost',
    user : 'root',
    password : password,
    database : 'dessine_moi_un_job'
    }
    }); 