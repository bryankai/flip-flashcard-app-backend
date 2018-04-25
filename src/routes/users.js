const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
////////////////////////////////////////////////////////////////////

router.post('/', userController.createUser)
router.get('/', userController.getAllUsers)

////////////////////////////////////////////////////////////////////
// DECK Nested CRUD Methods
////////////////////////////////////////////////////////////////////
router.post('/:id/decks', userController.createDeck)
router.get('/:id/decks', userController.getAllDecks)
router.get('/:id/decks/:deckId', userController.getOneDeck)
router.put('/:id/decks/:deckId', userController.editDeck)
router.delete('/:id/decks/:deckId', userController.removeDeck)

////////////////////////////////////////////////////////////////////
// CARDS Nested CRUD Methods
////////////////////////////////////////////////////////////////////
router.get('/:id/decks/:deckId/cards', userController.getAllCards)
// router.get('/:id/decks/:deckId/cards/:cardId', userController.getOneCard)
router.post('/:id/decks/:deckId/cards', userController.createCard)
// router.delete('/:id', userController.removeCard)
// router.put('/:id', userController.updateCard)

module.exports = router
