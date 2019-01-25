
exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers', (table) => {
    table.increments()
    table.integer('id_candidates')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('candidates')
      .onDelete('CASCADE');
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
    table.string('file_link');
    table.text('text').notNullable().defaultsTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answers');
};
