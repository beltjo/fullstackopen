import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import CreateForm from './components/CreateForm'
import Logout from './components/Logout'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

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

const padding = {
  padding: 5
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)

  const loginPath = '/login'
  const homePath = '/'
  const userWord = 'user'




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
    <Router>
      <div>
        <Link style={padding} to={homePath}>blogs</Link>
        { !user && <Link style={padding} to={loginPath}>login</Link> }
        { user && <Logout setUser={setUser} userWord={userWord} homePath={homePath}></Logout> }
      </div>
      <Routes>
        <Route path={homePath} element= {
          <div>
            { notificationDiv(notificationMessage, setNotificationMessage)}
            { BlogsDiv(blogs, setBlogs, user) }
            { user && (<>
              <Togglable buttonLabel='Create Blog'>
                <CreateForm setBlogs={setBlogs} blogs={blogs} setNotificationMessage={setNotificationMessage} postBlog={blogService.postBlog}/>
              </Togglable>
            </>)
            }

          </div>
        }>
        </Route>
        <Route path={loginPath} element={
          <Login user={user} setUser={setUser} userWord={userWord} homePath={homePath} setNotificationMessage={setNotificationMessage}/>
        }>

        </Route>
      </Routes>

    </Router>
  )
}

export default App