const TABLE_NAME = 'decks'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, deckName: 'Fav Collection', description: 'My favorite verses', users_id: '1'},
        {id: 2, deckName: 'New deck', description: 'My second deck', users_id: '1'},
        {id: 3, deckName: 'New Testament', description: 'New Testament bible verse flash cards', users_id: '1'},
        {id: 4, deckName: 'Test User Deck 2', description: 'This is test users second deck', users_id: '2'},
        {id: 5, deckName: 'User 3 Deck', description: 'This is a User 3  deck', users_id: '3'}
      ])
    })
    .then(() => {
      // reset sequence so that you can manually insert data and have it go to the next id #
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
