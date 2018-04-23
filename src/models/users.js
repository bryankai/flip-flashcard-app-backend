const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')

////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
////////////////////////////////////////////////////////////////////

function getUserByEmail(email){
  return (
    db('users')
    .where({ email })
    .first()
  )
}

function createUser(email, password){
  // check to see of user already exists
  return getUserByEmail(email)
  .then(function(data){
    // if user already exists, return 400
    if(data) throw { status: 400, message:'Email already being used'}

    // hash password
    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){

    // 3. Insert record into database
    return (
      db('users')
      .insert({ email, password: hashedPassword })
      .returning('*')
    )
  })
  .then(function([ data ]){
    // 4. strip hashed password away from object
    delete data.password
    // 5. "return/continue" promise
    return data
  })
}

////////////////////////////////////////////////////////////////////
// DECK Nested CRUD Methods
////////////////////////////////////////////////////////////////////
function getAllDecks(users_id){
  return (
    db('decks')
    .where({ users_id })
  )
}

function getOneDeck(users_id, id){
  return (
    db('decks')
    .where({ users_id })
    .where({ id })
    .first()
  )
}

function createDeck(users_id, deckName, description) {
  return (
    db('decks')
    .insert({ users_id, deckName, description })
    .returning('*')
  )
}


////////////////////////////////////////////////////////////////////
// CARDS Nested CRUD Methods
////////////////////////////////////////////////////////////////////


module.exports = {
  createUser,
  getUserByEmail,
  getAllDecks,
  getOneDeck,
  createDeck
}
