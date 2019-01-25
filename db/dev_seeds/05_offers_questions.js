
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('offers_questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('offers_questions').insert([
        {id_offers: 1, id_questions: 1,},
        {id_offers: 1, id_questions: 2,},
        {id_offers: 1, id_questions: 3,},
        {id_offers: 1, id_questions: 6,},
        {id_offers: 2, id_questions: 1,},
        {id_offers: 2, id_questions: 2,},
        {id_offers: 2, id_questions: 3,},
        {id_offers: 2, id_questions: 4,},
        {id_offers: 2, id_questions: 5,},
        {id_offers: 2, id_questions: 6,},
        {id_offers: 3, id_questions: 1,},
        {id_offers: 3, id_questions: 2,},
        {id_offers: 3, id_questions: 5,},
        {id_offers: 3, id_questions: 6,},
        {id_offers: 4, id_questions: 1,},
        {id_offers: 4, id_questions: 2,},
        {id_offers: 4, id_questions: 3,},
        {id_offers: 4, id_questions: 4,},
        {id_offers: 4, id_questions: 5,},
        {id_offers: 4, id_questions: 6,},
        {id_offers: 5, id_questions: 1,},
        {id_offers: 5, id_questions: 2,},
        {id_offers: 5, id_questions: 4,},
        {id_offers: 5, id_questions: 5,},
        {id_offers: 5, id_questions: 6,},
        {id_offers: 6, id_questions: 1,},
        {id_offers: 6, id_questions: 2,},
        {id_offers: 6, id_questions: 3,},
        {id_offers: 6, id_questions: 5,},
        {id_offers: 6, id_questions: 6,},
        {id_offers: 7, id_questions: 1,},
        {id_offers: 7, id_questions: 2,},
        {id_offers: 7, id_questions: 3,},
        {id_offers: 7, id_questions: 4,},
        {id_offers: 7, id_questions: 5,},
        {id_offers: 7, id_questions: 6,},
        {id_offers: 8, id_questions: 1,},
        {id_offers: 8, id_questions: 2,},
        {id_offers: 8, id_questions: 3,},
        {id_offers: 8, id_questions: 4,},
        {id_offers: 8, id_questions: 5,},
      ]);
    });
};
