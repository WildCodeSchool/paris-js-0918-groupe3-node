
exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('siret').notNullable();
    table.string('password').notNullable();
    table.text('description');
    table.string('logo');
    table.string('link');
    table.string('email').unique().notNullable();
    table.boolean('is_active').notNullable().defaultsTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies');
};
