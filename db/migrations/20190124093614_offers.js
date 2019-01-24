
exports.up = function(knex, Promise) {
  return knex.schema.createTable('offers', (table) => {
    table.increments();
    table.integer('id_companies')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('companies')
      .onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('contract_type').notNullable();
    table.string('place').notNullable();
    table.boolean('is_active').notNullable().defaultsTo(true);
    table.boolean('is_published').notNullable().defaultsTo(true);
    table.date('valid_until').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('offers');
};
