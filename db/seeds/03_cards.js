const TABLE_NAME = 'cards'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, bibleReference: 'John 3:16', passage: 'For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.', decks_id: 1},
        {id: 2, bibleReference: 'John 11:35', passage: 'Jesus wept.', decks_id: 2},
        {id: 3, bibleReference: 'John 1:1', passage: 'In the beginning...', decks_id: 2},
        {id: 4, bibleReference: 'John 1:2', passage: 'He was in the beginning with God..', decks_id: 1}
      ])
    })
    .then(() => {
      // reset sequence so that you can manually insert data and have it go to the next id #
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
