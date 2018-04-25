const TABLE_NAME = 'attempts'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.increments()
    table.integer('cards_id').notNullable().references('cards.id')
    table.boolean('correct')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
