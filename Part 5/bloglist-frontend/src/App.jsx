import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import loginService from './services/login'
import blogService from './services/blogs'

const BlogsDiv = (blogs) => {
  return <Blogs blogs={blogs} />
} 

const LoggedInDiv = (username, logoutFunction) => {
  return <div>
    <label>
    {username} logged in
    <button type="button" onClick={logoutFunction}>logout</button>
    </label>
  </div>
} 

const LoginDiv = (username, setUsername, password, setPassword, handleLogin, loginMessage) => {
  console.log(username)
  return <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} loginMessage={loginMessage} />
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState(null)
  //const [userToken, setUserToken] = useState(null)

  const userWord = 'user'
  const handleLogin = async (event) => {

    event.preventDefault();
    setLoginMessage(null)


    console.log('Logging in with ', username, ' and ', password)
    try {
      const user = await loginService.handleLogin({username, password})
      blogService.setToken(user.token)
      console.log("user is ", user)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem({userWord}, JSON.stringify(user))
    } catch( error ) {
      console.error(error)
      setLoginMessage( error.response.data.error )
    }

  }

  const logoutFunction = () => {
    setUser(null)
    window.localStorage.removeItem({userWord})
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem({userWord})
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)      
    }
  }, [])

  return (
    <div>
      { !user && LoginDiv(username, setUsername, password, setPassword, handleLogin, loginMessage) }
      { user && LoggedInDiv(user.name, logoutFunction) }
      { user && BlogsDiv(blogs) }
    </div>

  )
}

export default App