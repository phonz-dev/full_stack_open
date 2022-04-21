import Input from './Input'

const LoginForm = props => {
  const {
    handleLogin,
    setUsername,
    setPassword,
    username,
    password
  } = props

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <Input
          id='username'
          text='username:'
          type='text'
          value={username}
          handleChange={({ target }) => setUsername(target.value)}
        />
        <Input
          id='password'
          text='password:'
          type='password'
          value={password}
          name='password'
          handleChange={({ target }) => setPassword(target.value)}
        />
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm