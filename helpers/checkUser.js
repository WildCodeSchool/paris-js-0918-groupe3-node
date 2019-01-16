const bcrypt = require('bcrypt');
const knex = require('../dbconfig');

/**
 * Checks if email exists and is password matches.
 * @param {String} email 
 * @param {String} password 
 * @param {String} userType 'candidates or compannies'
 * @returns {Boolean} true if email found in db and password matches.
 */
const checkUser = async (email, password, userType) => {
  const user = await knex.select('id', 'password').from(userType).where({email});
  if(!user.length) return {
    match: false,
    id: undefined,
  };
  else {
    const match = await bcrypt.compare(password, user[0].password);
    return {
      match,
      id: user[0].id,
    };
  }  
};

module.exports = checkUser;
