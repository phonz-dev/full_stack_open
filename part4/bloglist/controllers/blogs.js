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

	if (!request.user.id) {
		return response.status(401).json({
			error: 'token is missing or invalid'
		})
	}

	const user = await User.findById(request.user.id)
	const newBlog = new Blog({
		...body,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await newBlog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const blogToDelete = await Blog.findById(request.params.id)

	if (blogToDelete.user.toString() !== request.user.id) {
		return response.status(401).json({
			error: 'token is invalid'
		})
	}

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