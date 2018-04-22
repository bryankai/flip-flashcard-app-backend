exports.seed = function(knex, Promise) {
  // Deletes ALL data from each of the tables
  // This is necessary so you can seed multiple times
  return knex('users_cards').del()
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
//
// exports.seed = function(knex, Promise) {
//   const tablesToClean = ['students', 'cohorts']
//   return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())
// };
