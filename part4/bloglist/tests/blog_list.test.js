const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a new blog', () => {
	test('succeeds with a valid data', async () => {
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

	test('fails with status 400 if title and/or url is missing', async () => {
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
})

describe('deletion of a blog', () => {
	test('succeeds with valid id', async () => {
		const blogsBeforeDeletion = await helper.blogsInDb()
		const blogToDelete = blogsBeforeDeletion[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAfterDeletion = await helper.blogsInDb()
		expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1)

		const titles = blogsAfterDeletion.map(blog => blog.title)
		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe('updating a blog', () => {
	test('succeeds with valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]
		const newBlog = { ...blogToUpdate, likes: 30 }

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()
		const updatedBlog = blogsAtEnd[0]

		expect(newBlog).toEqual(updatedBlog)
	})
})

describe('when there is only one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const password = await bcrypt.hash('sekret', 10)
		const user = new User({
			username: 'root',
			name: 'Superuser',
			password
		})

		await user.save()
	})

	test('creation succeeds with valid data', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'ahellas',
			name: 'Arto Hellas',
			password: 'salainen'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(({ username }) => username)
		expect(usernames).toContain(newUser.username)
	})
})

afterAll(() => {
	mongoose.connection.close()
})