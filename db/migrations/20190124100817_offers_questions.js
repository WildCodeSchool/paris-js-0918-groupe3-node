
exports.up = function(knex, Promise) {
  return knex.schema.createTable('offers_questions', (table) => {
    table.integer('id_offers')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('offers')
      .onDelete('CASCADE');
    table.integer('id_questions')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('offers_questions');
};
