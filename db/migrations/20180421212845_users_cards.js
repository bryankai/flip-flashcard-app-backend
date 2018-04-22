const TABLE_NAME = 'users_cards'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.increments()
    table.integer('users_id').notNullable().references('users.id')
    table.integer('cards_id').notNullable().references('cards.id')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(TABLE_NAME)
};
