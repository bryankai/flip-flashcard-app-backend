const TABLE_NAME = 'decks'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('deckName').notNullable()
    table.string('description').notNullable()
    table.integer('users_id').notNullable().references('users.id')
    table.timestamps(true, true) // true = default timestamps, true = default to now
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
