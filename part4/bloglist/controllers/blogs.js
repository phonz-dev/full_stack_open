const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { blogs: 0 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const users = await User.find({})

	const blog = {
		...body,
		likes: body.likes || 0,
		user: users[0]._id
	}

	const savedBlog = await new Blog(blog).save()
	if (savedBlog) {
		users[0].blogs = users[0].blogs.concat(savedBlog._id)
		await users[0].save()
		return response.status(201).json(savedBlog)
	}

	response.status(400).json({
		error: 'title and url must not be empty'
	})
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const blog = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		blog,
		{ new: true, runValidators: true, context: 'query' }
	)

	response.json(updatedBlog)
})

module.exports = blogsRouter