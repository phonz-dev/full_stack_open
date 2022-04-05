const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
require('dotenv').config()


const mongoUrl = process.env.MONGODB_URI

console.log('connecting to', mongoUrl);

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.error('error connecting to MongoDB', error.message);
  })

app.use(cors())
app.use(express.json())


const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('------');
  next();
}

app.use(requestLogger)

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})