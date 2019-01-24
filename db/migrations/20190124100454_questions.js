
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', (table) => {
    table.increments();
    table.text('text').notNullable();
    table.boolean('is_custom').notNullable().defaultsTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions');
};
