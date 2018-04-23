const TABLE_NAME = 'attempts'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, users_id: 1, cards_id: 1, correct: true},
        {id: 2, users_id: 1, cards_id: 2, correct: false},
        {id: 3, users_id: 1, cards_id: 1, correct: false},
        {id: 4, users_id: 1, cards_id: 2, correct: false},
        {id: 5, users_id: 1, cards_id: 1, correct: true},
        {id: 6, users_id: 1, cards_id: 2, correct: true}
      ])
    })
    .then(() => {
      // reset sequence so that you can manually insert data and have it go to the next id #
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
