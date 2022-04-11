const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
]

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs returned has an "id" property', async () => {
	const response = await api.get('/api/blogs')

	for (let blog of response.body) {
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

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length + 1)

	const titles = response.body.map(blog => blog.title)
	expect(titles).toContain('TDD harms architecture')
})

test('if the "likes" property is undefined, defaults to zero', async () => {
	const blog = {
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
	}

	await api
		.post('/api/blogs')
		.send(blog)

	const response = await api.get('/api/blogs')
	const blogToTest = response.body[response.body.length - 1]

	expect(blogToTest.likes).toBe(0)
})

afterAll(() => {
	mongoose.connection.close()
})