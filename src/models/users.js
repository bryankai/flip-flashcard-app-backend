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
  return (
    db('users')
    .where({ email })
    .first()
  )
}

function getOneUser(id){
  return (
    db('users')
    .where({ id })
    .first()
  )
}

function createUser(name, email, password){
  return getUserByEmail(email)
  .then(function(data){
    if(data) throw { status: 400, message:'Email already being used'}
    return bcrypt.hash(password, 10)
  })
  .then(function(hashedPassword){
    return (
      db('users')
      .insert({ name, email, password: hashedPassword })
      .returning('*')
      .then(function([data]){
        return data
      })
    )
  })
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

////////////////////////////////////////////////////////////////////
// ATTEMPT Nested CRUD Methods
////////////////////////////////////////////////////////////////////
function createAttempt(cards_id, correct) {
  return (
    db('attempts')
    .insert({ cards_id, correct })
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function getAllAttempts(cards_id){
  return (
    db('attempts')
    .where({ cards_id })
  )
}

////////////////////////////////////////////////////////////////////
// User Attempts Methods
////////////////////////////////////////////////////////////////////
function getAllUserAttempts(users_id){
  return (
    db.from('decks')
    .innerJoin('cards', 'decks_id', 'decks.id')
    .innerJoin('attempts', 'cards_id', 'cards.id')
    .where({ users_id })
  )
}

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
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
  removeCard,
  createAttempt,
  getAllAttempts,
  getAllUserAttempts
}
