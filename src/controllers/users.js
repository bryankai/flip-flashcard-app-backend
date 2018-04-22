const userModel = require('../models/users')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function create(req, res, next){
  console.log('controller create')
  if(!req.body.username){
    return next({ status: 400, message: 'Bad username'})
  }

  if(!req.body.password){
    return next({ status: 400, message: 'Bad username'})
  }

  userModel.create(req.body.username, req.body.password)
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

function getAll(req, res, next) {
  userModel.getAll()
  .then(function(data){
    return res.status(201).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

module.exports = {
  create
}
