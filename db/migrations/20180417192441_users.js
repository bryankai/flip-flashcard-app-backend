const TABLE_NAME = 'users'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.string('username').notNullable()
    table.string('password').notNullable()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.integer('score')
    table.timestamps(true, true) // true = default timestamps, true = default to now
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
