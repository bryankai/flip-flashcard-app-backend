const db = require('../../db')
const bcrypt = require('bcrypt-as-promised')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getOneByEmail(email){
  console.log('model email')
  console.log(email)
  return (
    db('users')
    .where({ email })
    .first()
  )
}

function getAll(){
  return db('users')
}

//////////////////////////////////////////////////////////////////////////////
// Create a user
//
// 1. Check to see if user already exists
//   a. if so, return a 400 with appropriate error message
// 2. Hash password
// 3. Insert record into database
// 4. strip hashed password away from object
// 5. "return/continue" promise
//////////////////////////////////////////////////////////////////////////////

function create(email, password){
    console.log('model create')
  // check to see of user already exists
  return getOneByUserName(email)
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

module.exports = {
  getOneByEmail,
  create
}
