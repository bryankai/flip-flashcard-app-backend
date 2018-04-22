const TABLE_NAME = 'users_cards'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, users_id: 1, cards_id: 1},
        {id: 2, users_id: 1, cards_id: 2}
      ])
    })
    .then(() => {
      // reset sequence so that you can manually insert data and have it go to the next id #
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
