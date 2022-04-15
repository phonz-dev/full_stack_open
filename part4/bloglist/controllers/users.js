const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
	const users = await User
		.find({}).populate('blogs', { likes: 0, user: 0 })
	res.json(users)
})

usersRouter.post('/', async (req, res) => {
	let { username, name, password } = req.body

	const userExist = await User.findOne({ username })
	if (userExist) {
		return res.status(400).json({
			error: 'username must be unique'
		})
	}

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