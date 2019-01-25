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
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue lorem. Quisque in ex vitae odio convallis mattis in eget magna. Phasellus blandit orci mollis augue aliquam, quis pretium lorem pretium. Proin suscipit, justo quis posuere iaculis, leo neque ornare leo, sed condimentum eros lectus vel augue. Curabitur porta ac nibh facilisis tempor. Suspendisse sed dolor eu dui egestas gravida. Aenean pulvinar tristique diam.',
          logo: 'public/logoCompanies/logo_Wild_Code_School_seeded.png',
          link: 'https://wildcodeschool.fr/',
          email: 'wildcodeschool@yopmail.com',
          is_active: true,
        },
        {
          id: 2,
          name: 'Airbnb',
          siret: '98765432123456',
          password: hash,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue lorem. Quisque in ex vitae odio convallis mattis in eget magna. Phasellus blandit orci mollis augue aliquam, quis pretium lorem pretium. Proin suscipit, justo quis posuere iaculis, leo neque ornare leo, sed condimentum eros lectus vel augue. Curabitur porta ac nibh facilisis tempor. Suspendisse sed dolor eu dui egestas gravida. Aenean pulvinar tristique diam.b',
          logo: 'public/logoCompanies/logo_Airbnb_seeded.png',
          link: 'https://airbnb.com/',
          email: 'airbnb@yopmail.com',
          is_active: true,
        },
        {
          id: 3,
          name: 'Alten',
          siret: '67890123456789',
          password: hash,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue lorem. Quisque in ex vitae odio convallis mattis in eget magna. Phasellus blandit orci mollis augue aliquam, quis pretium lorem pretium. Proin suscipit, justo quis posuere iaculis, leo neque ornare leo, sed condimentum eros lectus vel augue. Curabitur porta ac nibh facilisis tempor. Suspendisse sed dolor eu dui egestas gravida. Aenean pulvinar tristique diam.b',
          logo: 'public/logoCompanies/logo_Alten_seeded.png',
          link: 'https://alten.com/',
          email: 'alten@yopmail.com',
          is_active: true,
        },
      ]);
    });
};


