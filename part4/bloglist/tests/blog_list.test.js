const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const blogs = await helper.blogsInDb()

	expect(blogs).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('blogs returned has an "id" property', async () => {
	const blogs = await helper.blogsInDb()

	for (let blog of blogs) {
		expect(blog.id).toBeDefined()
	}
})

test('a valid blog can be added', async () => {
	const blog = {
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
	}

	await api
		.post('/api/blogs')
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAfterAdding = await helper.blogsInDb()
	expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAfterAdding.map(blog => blog.title)
	expect(titles).toContain('TDD harms architecture')
})

test('if the "likes" property is undefined, it defaults to zero', async () => {
	const blog = {
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
	}

	await api
		.post('/api/blogs')
		.send(blog)

	const blogsAfterAdding = await helper.blogsInDb()
	const recentlyAddedBlog = blogsAfterAdding[blogsAfterAdding.length - 1]

	expect(recentlyAddedBlog.likes).toBe(0)
	expect(recentlyAddedBlog.title).toBe('TDD harms architecture')
})

test('blog without title and/or url is not added', async () => {
	const blog = {
		author: 'Edsger W. Dijkstra',
		likes: 12,
	}

	await api
		.post('/api/blogs')
		.send(blog)
		.expect(400)

	const blogsAfterAdding = await helper.blogsInDb()
	expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
	mongoose.connection.close()
})