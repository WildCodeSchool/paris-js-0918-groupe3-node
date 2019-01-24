
exports.up = function(knex, Promise) {
  return knex.schema.createTable('applications', (table) => {
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
    table.boolean('is_sent').notNullable().defaultsTo(true);
    table.string('status').notNullable().defaultsTo('waiting');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('applications');
};
