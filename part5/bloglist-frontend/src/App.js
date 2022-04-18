import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Input from './components/Input'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Error', error.message)
    }
  }

  const loginForm = () => (
      <>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <Input 
            text='username:'
            type='text'
            value={username}
            handleChange={({target}) => setUsername(target.value)}
          />
          <Input
            text='password:'
            type='password'
            value={password}
            name='password'
            handleChange={({target}) => setPassword(target.value)}
          />
          <button type='submit'>login</button>
        </form>
      </>
  )

  return (
    <div>
      {user === null 
        ? loginForm()
        : <Blogs blogs={blogs} />
      }

      
    </div>
  )
}

export default App