const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({})
		response.json(blogs)
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body
	const blog = { ...body, likes: body.likes || 0 }

	try {
		const returnedBlog = await new Blog(blog).save()
		response.status(201).json(returnedBlog)
	} catch (exception) {
		next(exception)
	}
})

module.exports = blogsRouter