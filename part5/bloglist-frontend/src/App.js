import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Error', error.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleBlogCreation = async event => {
    event.preventDefault()

    try {
      const newBlog = {
        title, author, url
      }

      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))

      setTitle('')
      setAuthor('')
      setUrl('')

      console.log('Blog created!')

    } catch (error) {
      console.error('Error', error.message)
    }
  }

  const display = () => {
    if (user === null) {
      return <LoginForm 
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    }

    return(
      <>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        
        <BlogForm 
          handleBlogCreation={handleBlogCreation}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          title={title}
          author={author}
          url={url}
        />

        <Blogs blogs={blogs} />
      </>
    )
  }

  return (
    <div>
     {display()}     
    </div>
  )
}

export default App