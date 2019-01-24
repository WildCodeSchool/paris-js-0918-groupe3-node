
exports.up = function(knex, Promise) {
  return knex.schema.createTable('candidates', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable().unique();
    table.boolean('is_active').notNullable().defaultsTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('candidates');
};
