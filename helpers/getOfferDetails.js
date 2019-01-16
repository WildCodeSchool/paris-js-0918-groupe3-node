const knex = require('../dbconfig');

module.exports = async (id_offer) => {
  const result = await 
    knex
      .select('id_companies', 'title', 'description', 'contract_type', 'place')
      .from('offers')
      .where({
        'id': id_offer
      });
  return result[0];
};