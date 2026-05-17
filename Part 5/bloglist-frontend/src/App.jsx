import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import loginService from './services/login'
import blogService from './services/blogs'
import CreateForm from './components/CreateForm'

const Togglable = ( props ) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const toggleVisibility = () => {
    return setVisible(!visible)
  }

  return <div>
    <div style={hideWhenVisible}>
      <button onClick={toggleVisibility} >{props.buttonLabel}</button>
    </div>
    <div style={showWhenVisible}>
      {props.children}
      <button onClick={toggleVisibility}> Cancel</button>
    </div>
  </div>
}


const BlogsDiv = (blogs, setBlogs, user) => {
  return <Blogs blogs={blogs} setBlogs={setBlogs} user={user}/>
}

const LoggedInDiv = (username, logoutFunction) => {
  return <div>
    <label>
      {username} logged in
      <button type="button" onClick={logoutFunction}>logout</button>
    </label>
  </div>
}

const LoginDiv = (username, setUsername, password, setPassword, handleLogin) => {
  console.log(username)
  return <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
}


const notificationDiv = (notificationMessage, setNotificationMessage) => {
  if (notificationMessage === null) {
    return
  }

  setTimeout( () => {
    setNotificationMessage(null)
  }, 7000)

  return <div className={notificationMessage.type}>
    <p>
      {notificationMessage.message}
    </p>
  </div>
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


  const userWord = 'user'
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
    } catch( error ) {
      console.error(error)
      setNotificationMessage( { message: `${error.response.data.error}`, type: 'error' } )
    }

  }

  const logoutFunction = () => {
    setUser(null)
    window.localStorage.removeItem({ userWord })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort( (a,b) => b.likes - a.likes ) )
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem({ userWord })
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])

  return (
    <div>
      { notificationDiv(notificationMessage, setNotificationMessage)}
      { !user && LoginDiv(username, setUsername, password, setPassword, handleLogin) }
      { user && LoggedInDiv(user.name, logoutFunction) }
      { user && BlogsDiv(blogs, setBlogs, user) }
      { user && (<>
        <Togglable buttonLabel='Create Blog'>
          <CreateForm setBlogs={setBlogs} blogs={blogs} setNotificationMessage={setNotificationMessage}/>
        </Togglable>
      </>)
      }

    </div>

  )
}

export default App