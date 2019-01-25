const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then( async () => {
      // Inserts seed entries
      const hash = await bcrypt.hash('coucou', 10);
      return knex('companies').insert([
        {
          id: 1,
          name: 'Wild Code School',
          siret: '12345678901234',
          password: hash,
          description: 'Ecole de developpeurs web',
          logo: 'public/logoCompanies/logo_Wild_Code_School_seeded.png',
          link: 'https://wildcodeschool.fr/',
          email: 'wildcodeschool@yopmail.com',
          is_active: true,
        },
      ]);
    });
};
