const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
////////////////////////////////////////////////////////////////////

router.post('/', userController.createUser)

// router.get('/', userController.getAllUsers)

////////////////////////////////////////////////////////////////////
// DECK Nested CRUD Methods
////////////////////////////////////////////////////////////////////
router.post('/:id/decks', userController.createDeck)
router.get('/:id/decks', userController.getAllDecks)
router.get('/:id/decks/:deckId', userController.getOneDeck)
router.delete('/:id/decks/:deckId', userController.removeDeck)
router.put('/:id/decks/:deckId', userController.editDeck)

////////////////////////////////////////////////////////////////////
// CARDS Nested CRUD Methods
////////////////////////////////////////////////////////////////////
// router.get('/', userController.getAllCards)
// router.get('/:id', userController.getOneCard)
// router.post('/', userController.createCards)
// router.delete('/:id', userController.removeCard)
// router.put('/:id', userController.updateCard)

module.exports = router
