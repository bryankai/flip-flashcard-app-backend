const TABLE_NAME = 'users'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, name: 'Bryan Kai', email: 'brykai123@gmail.com', password: '$2a$10$tLyVD58dyfy8meEV.dpcX.doVpJAiTdvONNwBQqOIw4bThvoO7Edi'},
        {id: 2, name: 'Test User', email: 'testuser@gmail.com', password: '$2a$10$7WFHhmrVOd92oRnKqTIAgeA7YINlom1.vxAw26CPjPC/PjPJ09xSy'}
        //passwords: bryankai and testuser
      ])
    })
    .then(() => {
      // reset sequence so that you can manually insert data and have it go to the next id #
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
