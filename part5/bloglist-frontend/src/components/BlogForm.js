import { useState } from 'react'
import Input from './Input'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <Input
          id='title'
          text='title:'
          type='text'
          value={title}
          handleChange={({ target }) => setTitle(target.value)}
          placeholder='blog title here'
        />
        <Input
          id='author'
          text='author:'
          type='text'
          value={author}
          handleChange={({ target }) => setAuthor(target.value)}
          placeholder='blog author here'
        />
        <Input
          id='url'
          text='url:'
          type='text'
          value={url}
          handleChange={({ target }) => setUrl(target.value)}
          placeholder='blog url here'
        />
        <button id='createButton' type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm