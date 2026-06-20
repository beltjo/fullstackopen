import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const Login = ({ setUser, homePath, userWord, setNotificationMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {

    event.preventDefault()
    setNotificationMessage(null)


    console.log('Logging in with ', username, ' and ', password)
    try {
      const user = await loginService.handleLogin({ username, password })
      blogService.setToken(user.token)
      console.log('user is ', user)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem({ userWord }, JSON.stringify(user))
      navigate(homePath)
    } catch( error ) {
      console.error(error)
      setNotificationMessage( { message: `${error.response.data.error}`, type: 'error' } )
    }

  }

  return (<div>
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <TextField label="username" value={username} onChange={( { target } ) => setUsername(target.value)}/>
      </div>
      <div>
        <TextField label="password" value={password} onChange={ ({ target }) => setPassword(target.value)}/>
      </div>
      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>Login</Button>
    </form>
  </div>)
}

export default Login