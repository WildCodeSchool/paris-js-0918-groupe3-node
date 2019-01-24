const environnement = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environnement];
module.exports = require('knex')(config);