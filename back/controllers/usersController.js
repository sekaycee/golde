const User = require('../models/User')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

// @desc: Get all users
// @route: GET /users
// @access: Private
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select('-password').lean()
	if (!users?.length)
		return res.status(400).json({ message: 'no users found' })
	res.json(users)
})

// @desc: Create new user
// @route: POST /users
// @access: Private
const createNewUser = asyncHandler(async (req, res) => {
	const { username, password, roles } = req.body

	// validate data
	if (!username || !password || !Array.isArray(roles) || !roles.length)
		return res.status(400).json({ message: 'highlighted fields are required' })

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
		res.status(201).json({ message: `new user ${username} created` })
	else
		res.status(400).json({ message: 'invalid user data received' })
})

// @desc: Update a user
// @route: PATCH /users
// @access: Private
const editUser = asyncHandler(async (req, res) => {
	const { id, username, active, roles, password } = req.body

	// validate data
	if (!id || !username || !Array.isArray(roles) || !roles?.length || typeof active !== 'boolean')
		return res.status(400).json({ message: 'highlighted fields are required' })

	// get existing user from db
	const user = await User.findById(id).exec()
	if (!user)
		return res.status(400).json({ message: 'user not found' })

	// check for duplicate
	const dup = User.findOne({ username }).lean().exec()
	if (dup && dup?._id.toString() !== id)
		return res.status(409).json({ message: 'duplicate username' })
	
	// update user properties
	user.username = username
	user.active = active
	user.roles = roles

	// add password after validation
	if (password)
		user.password = await bcrypt.hash(password, 10) // salt rounds

	const editedUser = await user.save()
	res.json({ message: `${editedUser.username} updated` })
})

// @desc: Delete a user
// @route: DELETE /users
// @access: Private
const removeUser = asyncHandler(async (req, res) => {
	const { id } = req.body

	if (!id)
		return res.status(400).json({ message: 'user id required' })

	const products = await Product.findOne({ user: id }).lean().exec()
	if (products?.length)
		return res.status(400).json({ message: 'user have created products' })

	const user = await User.findById(id).exec()
	if (!user)
		return res.status(400).json({ message: 'user not found' })

	const result = user.deleteOne()
	res.json({ message: `user ${result.username} with id ${result.id} removed` })
})

module.exports = {
	getAllUsers,
	createNewUser,
	editUser,
	removeUser
}
