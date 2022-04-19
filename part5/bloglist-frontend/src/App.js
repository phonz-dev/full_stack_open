import React, { useState, useEffect, useRef } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const blogsCopy = [ ...blogs ]
      setBlogs(blogsCopy.sort((b1, b2) => b2.likes - b1.likes))
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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

      notify(`Welcome back ${user.name}!`)

      setUsername('')
      setPassword('')
    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    notify(`See you soon ${user.name}!`)
    setUser(null)
  }

  const addBlog = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))

      notify(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`
      )

    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }

  const blogFormRef = useRef()
 
  const incrementLikesOf = async id => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const newBlog = { 
      user: blogToUpdate.user.id,
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url
    }

    try {
      const updatedBlog = await blogService.update(id, newBlog)
      const updatedBlogs = blogs.map(blog => blog.id === id
        ? updatedBlog : blog
      )
      setBlogs(updatedBlogs.sort((b1, b2) => b2.likes - b1.likes))
    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }

  const deleteBlogOf = async id => {
    const blogToDelete = blogs.find(blog => blog.id === id)
    const ok = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    
    try {
      if (ok) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        notify(`${blogToDelete.title} deleted`)
      }
    } catch (error) {
      notify(error.message, 'error')
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
        
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>

        <Blogs
          blogs={blogs} 
          incrementLikesOf={incrementLikesOf} 
          deleteBlogOf={deleteBlogOf}
        />
      </>
    )
  }

  return (
    <div>
      <Notification notification={notification}/>
     {display()}     
    </div>
  )
}

export default App