const User = require('../models/User')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc - Get all users
// @route - GET /users
// @access - Private
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select('-password').lean()
	if (!users)
		return res.status(400).json({ message: 'No users found' })
	res.json(users)
})

// @desc - Create new user
// @route - POST /users
// @access - Private
const createNewUser = asyncHandler(async (req, res) => {
	const { username, password, roles } = req.body

	// validate data
	if (!username || !password || !Array.isArray(roles) || !roles.length)
		return res.status(400).json({ message: 'Highlighted fields are required' })

	// check for duplicates
	const dup = await User.findOne({ username }).lean().exec()
	if (dup)
		res.status(409).json({ message: 'username already exists' })

	// hash password
	const pwdHash = await bcrypt.hash(password, 10) // salt rounds
	const userObj = { username, 'password':pwdHash, roles }
	
	// create and save new user
	const user = await User.create(userObj)
	if (user)
		res.status(201).json({ message: `New user ${username} created` })
	else
		res.status(400).json({ message: 'Invalid user data received' })
})

// @desc - Edit a user
// @route - PATCH /users
// @access - Private
const editUser = asyncHandler(async (req, res) => {

})

// @desc - Remove a user
// @route - DELETE /users
// @access - Private
const removeUser = asyncHandler(async (req, res) => {

})

module.exports = {
	getAllUsers,
	createNewUser,
	editUser,
	removeUser
}
