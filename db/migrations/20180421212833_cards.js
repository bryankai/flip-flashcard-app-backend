const TABLE_NAME = 'cards'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('bibleReference').notNullable()
    table.string('passage').notNullable()
    table.array('topics')
    table.boolean('inNewTestament')
    table.integer('decks_id').notNullable().references('decks.id')
    table.timestamps(true, true) // true = default timestamps, true = default to now
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
