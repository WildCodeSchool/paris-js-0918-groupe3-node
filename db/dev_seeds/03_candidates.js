const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('candidates').del()
    .then(async () => {
      const hash = await bcrypt.hash('coucou', 10);
      // Inserts seed entries
      return knex('candidates').insert([
        {
          id: 1,
          email: 'c.ribault.dev@gmail.com',
          password: hash,
          phone: '0612345678',
          is_active: true
        },
        {
          id: 2,
          email: 'jean.dufour@yopmail.com',
          password: hash,
          phone: '0789653422',
          is_active: true
        },
        {
          id: 3,
          email: 'michel.platini@yopmail.com',
          password: hash,
          phone: '0134786512',
          is_active: true
        },
      ]);
    });
};
