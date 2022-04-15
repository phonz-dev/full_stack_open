const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

usersRouter.post('/', async (req, res) => {
	let { username, name, password } = req.body

	const saltRounds = 10
	password = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		password
	})

	const savedUser = await user.save()
	res.status(201).json(savedUser)
})

module.exports = usersRouter