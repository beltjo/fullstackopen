import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import CreateForm from './components/CreateForm'
import Logout from './components/Logout'
import SingleBlog from './components/SingleBlog'
import BlogList from './components/BlogList'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import { homePath, loginPath, createPath } from './paths'
import { Alert, AppBar, Button, Toolbar } from '@mui/material'

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

const notificationDiv = (notificationMessage, setNotificationMessage) => {
  if (notificationMessage === null) {
    return
  }

  setTimeout( () => {
    setNotificationMessage(null)
  }, 7000)

  return <Alert severity={notificationMessage.type}>
    {notificationMessage.message}
  </Alert>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => match.params.id === blog.id )
    : null
  const userWord = 'user'
  const navigate = useNavigate()

  const likeBlog = async (blog) => {
    console.log(blog)
    console.log(blogs)
    const response = await blogService.LikeBlog(blog)
    console.log('LikeBlog response: ', response)

    const blogsWithoutOldItem = blogs.filter( (blog) => {
      return blog.id !== response.id
    })
    const updatedBlogs = blogsWithoutOldItem.concat(response)
    console.log('Updated blogs to new list: ', updatedBlogs)
    updatedBlogs.sort((a, b) => {
      return b.likes - a.likes
    })
    console.log('Sorted blog: ', updatedBlogs)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async (blog) => {
    console.log('Starting delete of ', blog)

    const choice = window.confirm(`Are you sure you want to delete ${blog.title}?`)

    if (choice) {
      const response = await blogService.deleteBlog(blog)
      const blogsWithoutItem = blogs.filter( (blog) => {
        return blog.id !== response.id
      })
      setBlogs(blogsWithoutItem)
      navigate(homePath)
    }

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
      <AppBar position="sticky">
        <Toolbar >
          <Button color='inherit' component={Link} to={homePath}>blogs</Button>
          { user && <Button color='inherit' component={Link} to={createPath}>Create Blog</Button>}
          { !user && <Button color='inherit' component={Link} to={loginPath}>login</Button> }
          { user && <Logout setUser={setUser} userWord={userWord} homePath={homePath}></Logout> }
        </Toolbar>
      </AppBar>
      { notificationDiv(notificationMessage, setNotificationMessage)}
      <Routes>
        <Route path={homePath} element= {
          <BlogList blogs={blogs}></BlogList>
        }>
        </Route>
        <Route path={loginPath} element={
          <Login user={user} setUser={setUser} userWord={userWord} homePath={homePath} setNotificationMessage={setNotificationMessage}/>
        }/>
        <Route path='/blogs/:id' element={
          <SingleBlog blog={blog} deleteBlog={deleteBlog} likeBlog={likeBlog} user={user} />
        }/>
        <Route path={createPath} element={
          <CreateForm setBlogs={setBlogs} blogs={blogs} setNotificationMessage={setNotificationMessage} postBlog={blogService.postBlog}/>
        }/>

      </Routes>
    </div>
  )
}

export default App