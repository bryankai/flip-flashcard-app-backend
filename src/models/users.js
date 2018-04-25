const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')

////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
////////////////////////////////////////////////////////////////////

function getAllUsers(users_id){
  return (
    db('users')
  )
}

function getUserByEmail(email){
  console.log(email)
  return (
    db('users')
    .where({ email })
    .first()
  )
}

function createUser(name, email, password){
  // check to see of user already exists
  console.log('models createUser')
  return getUserByEmail(email)
  .then(function(data){
    // if user already exists, return 400
    if(data) throw { status: 400, message:'Email already being used'}
    console.log('about to hash')
    // hash password
    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){
    console.log(hashedPassword)
    // 3. Insert record into database
    return (
      db('users')
      .insert({ name, email, password: hashedPassword })
      .returning('*')
      .then(function([data]){
        return data
      })
    )
  })
  // .then(function([ data ]){
  //   // 4. strip hashed password away from object
  //   delete data.password
  //   // 5. "return/continue" promise
  //   return data
  // })
}

////////////////////////////////////////////////////////////////////
// DECK Nested CRUD Methods
////////////////////////////////////////////////////////////////////
function createDeck(users_id, deckName, description) {
  return (
    db('decks')
    .insert({ users_id, deckName, description })
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

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

function editDeck(users_id, id, deckName, description){
  return (
    db('decks')
    .where({ users_id })
    .where({ id })
    .update({ deckName, description })
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function removeDeck(users_id, id){
  return (
    db('decks')
    .where({ users_id })
    .where({ id })
    .del()
    .returning('*')
    .then(function([data]){
      delete data.id
      return data
    })
  )
}


////////////////////////////////////////////////////////////////////
// CARDS Nested CRUD Methods
////////////////////////////////////////////////////////////////////
function createCard(decks_id, bibleReference, passage) {
  return (
    db('cards')
    .insert({ decks_id, bibleReference, passage })
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function getAllCards(decks_id){
  return (
    db('cards')
    .where({ decks_id })
  )
}

function getOneCard(decks_id, id){
  return (
    db('cards')
    .where({ decks_id })
    .where({ id })
    .first()
  )
}

function editCard(decks_id, id, bibleReference, passage){
  return (
    db('cards')
    .where({ decks_id })
    .where({ id })
    .update({ bibleReference, passage })
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function removeCard(decks_id, id){
  return (
    db('cards')
    .where({ decks_id })
    .where({ id })
    .del()
    .returning('*')
    .then(function([data]){
      delete data.id
      return data
    })
  )
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  createDeck,
  getAllDecks,
  getOneDeck,
  editDeck,
  removeDeck,
  createCard,
  getAllCards,
  getOneCard,
  editCard,
  removeCard
}
