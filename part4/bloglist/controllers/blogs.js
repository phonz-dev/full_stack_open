const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const blog = { ...body, likes: body.likes || 0 }

	const returnedBlog = await new Blog(blog).save()
	if (returnedBlog) {
		response.status(201).json(returnedBlog)
	} else {
		response.status(400).send({ error: 'title and url must not be empty' })
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = blogsRouter