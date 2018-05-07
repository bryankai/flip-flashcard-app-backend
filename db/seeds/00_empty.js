exports.seed = function(knex, Promise) {
  // Deletes ALL data from each of the tables
  // This is necessary so you can seed multiple times
  return knex('attempts').del()
    .then(function() {
      return knex('cards').del()
    })
    .then(function() {
      return knex('decks').del()
    })
    .then(function() {
      return knex('users').del()
    });
};
