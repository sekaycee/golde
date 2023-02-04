const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.Route('/')
	.get(usersController.getAllUsers())
	.post(usersController.createNewUser())
	.patch(usersController.editUser())
	.delete(usersController.removeUser())

module.exports = router
