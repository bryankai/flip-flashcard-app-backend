const TABLE_NAME = 'cards'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, bibleReference: 'John 3:16', passage: 'For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.', decks_id: 1},
        {id: 2, bibleReference: 'John 11:35', passage: 'Jesus wept.', decks_id: 2},
        {id: 3, bibleReference: 'John 1:1', passage: 'In the beginning was the Word, and the Word was with God, and the Word was God.', decks_id: 1},
        {id: 4, bibleReference: 'Romans 1:16', passage: 'For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek.', decks_id: 1},
        {id: 5, bibleReference: 'John 11:35', passage: 'Jesus wept.', decks_id: 1},
        {id: 6, bibleReference: 'Philipians 4:6', passage: 'Rejoice in the Lord always; again I will say, rejoice.', decks_id: 1},
        {id: 7, bibleReference: 'Joshua 1:9', passage: 'Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.', decks_id: 1}
      ])
    })
    .then(() => {
      // reset sequence so that you can manually insert data and have it go to the next id #
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
