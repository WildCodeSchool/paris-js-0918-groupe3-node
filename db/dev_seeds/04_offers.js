
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('offers').del()
    .then(function () {
      // Inserts seed entries
      return knex('offers').insert([
        {
          id: 1,
          title: 'Formateur Java',
          description: 'Former les élèves à coder en Java / Angular',
          contract_type: 'CDI',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:1
        },
        {
          id: 2,
          title: 'Campus Manager',
          description: 'Gérer le campus de Paris',
          contract_type: 'CDI',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:1
        },
        {
          id: 3,
          title: 'Formateur JavaScript',
          description: 'Former les élèves à coder en Node.js / React.js',
          contract_type: 'CDI',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:1
        },
      ]);
    });
};
