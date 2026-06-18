import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <label>
          username
          <input type="text" value={username} onChange={ ( { target } ) => setUsername(target.value)} />
        </label>
      </div>
      <div>
        <label>
          password
          <input type="text" value={password} onChange={ ( { target }) => setPassword(target.value)}/>
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>)
}

export default Login