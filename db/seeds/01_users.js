const TABLE_NAME = 'users'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, username: 'brykai123', password: 'asdf', name: 'Bryan Kai', email: 'brykai123@gmail.com'},
        {id: 2, username: 'testuser', password: 'testuser', name: 'Test User', email: 'testuser@gmail.com'}
      ])
    })
    .then(() => {
      // reset sequence so that you can manually insert data and have it go to the next id #
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
