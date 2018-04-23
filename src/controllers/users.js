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

function createDeck(req, res, next){
  if(!req.params.id){
    return next({ status: 400, message: 'Please provide users_id'})
  }
  if(!req.body.deckName){
    return next({ status: 400, message: 'Please provide deckName'})
  }
  if(!req.body.description){
    return next({ status: 400, message: 'Please provide description'})
  }

  userModel.createDeck(req.params.id, req.body.deckName, req.body.description)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}


function getAllDecks(req, res, next) {
  if(!req.params.id){
    return next({ status: 400, message: 'Please provide users_id'})
  }
  userModel.getAllDecks(req.params.id)
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}


function getOneDeck(req, res, next) {
  if(!req.params.id){
    return next({ status: 400, message: 'Please provide users_id'})
  }
  if(!req.params.deckId){
    return next({ status: 400, message: 'Please provide deckId'})
  }

  userModel.getOneDeck(req.params.id, req.params.deckId)
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}


function editDeck(req, res, next) {
  if(!req.params.id){
    return next({ status: 400, message: 'Please provide users_id'})
  }
  if(!req.params.deckId){
    return next({ status: 400, message: 'Please provide deckId'})
  }
  if(!req.body.deckName){
    return next({ status: 400, message: 'Please provide deckName'})
  }
  if(!req.body.description){
    return next({ status: 400, message: 'Please provide description'})
  }

  userModel.editDeck(req.params.id, req.params.deckId, req.body.deckName, req.body.description)
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}


function removeDeck(req, res, next) {
  if(!req.params.id){
    return next({ status: 400, message: 'Please provide users_id'})
  }
  if(!req.params.deckId){
    return next({ status: 400, message: 'Please provide deckId'})
  }

  userModel.removeDeck(req.params.id, req.params.deckId)
  .then(function(data){
    return res.status(200).send({ data })
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
  createDeck,
  getAllDecks,
  getOneDeck,
  editDeck,
  removeDeck
}
