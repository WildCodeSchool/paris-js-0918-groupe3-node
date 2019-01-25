
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('applications').del()
    .then(function () {
      // Inserts seed entries
      return knex('applications').insert([
        {id_candidates: 1, id_offers: 1, is_sent: 1, status: 'waiting'},
        {id_candidates: 2, id_offers: 1, is_sent: 1, status: 'validated'},
        {id_candidates: 3, id_offers: 1, is_sent: 1, status: 'rejected'},
        {id_candidates: 1, id_offers: 2, is_sent: 1, status: 'waiting'},
        {id_candidates: 2, id_offers: 2, is_sent: 1, status: 'validated'},
        {id_candidates: 3, id_offers: 2, is_sent: 1, status: 'rejected'},
        {id_candidates: 1, id_offers: 3, is_sent: 1, status: 'waiting'},
        {id_candidates: 2, id_offers: 3, is_sent: 1, status: 'validated'},
        {id_candidates: 3, id_offers: 3, is_sent: 1, status: 'rejected'},
      ]);
    });
};
