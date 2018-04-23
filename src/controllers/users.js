const userModel = require('../models/users')

////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
////////////////////////////////////////////////////////////////////

function createUser(req, res, next){
  console.log('controller create')
  if(!req.body.username){
    return next({ status: 400, message: 'Bad username'})
  }

  if(!req.body.password){
    return next({ status: 400, message: 'Bad username'})
  }

  userModel.createUser(req.body.username, req.body.password)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

////////////////////////////////////////////////////////////////////
// DECK Nested CRUD Methods
////////////////////////////////////////////////////////////////////

function getAllDecks(req, res, next) {
  userModel.getAllDecks(req.params.id)
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

function getOneDeck(req, res, next) {
  userModel.getOneDeck(req.params.id, req.params.deckId)
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

function createDeck(req, res, next){

  userModel.createDeck(req.params.id, req.body.deckName, req.body.description)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

////////////////////////////////////////////////////////////////////
// CARDS Nested CRUD Methods
////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////
// Quality of Life functions
////////////////////////////////////////////////////////////////////

module.exports = {
  createUser,
  getAllDecks,
  getOneDeck,
  createDeck
}
