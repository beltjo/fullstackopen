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

const BlogCreateDiv = (title, setTitle, author, setAuthor, url, setUrl, handleCreateBlog) => {
  return <>
    <div>
      <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <div>
          <label>
            title:
            <input type="text" value={title} onChange={ ({ target }) => setTitle(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            author:
            <input type="text" value={author} onChange={ ({ target }) => setAuthor(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            url:
            <input type="text" value={url} onChange={ ({ target }) => setUrl(target.value)}/>
          </label>
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  </>
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState(null)
  //const [userToken, setUserToken] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try{
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      const returnedBlog = await blogService.postBlog(blogObject)
      
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.error(error)
      setLoginMessage( error.response.data.error )
    }
  }


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
      blogService.setToken(user.token)
      console.log(user)      
    }
  }, [])

  return (
    <div>
      { !user && LoginDiv(username, setUsername, password, setPassword, handleLogin, loginMessage) }
      { user && LoggedInDiv(user.name, logoutFunction) }
      { user && BlogsDiv(blogs) }
      { user && BlogCreateDiv(title, setTitle, author, setAuthor, url, setUrl, handleCreateBlog)}
    </div>

  )
}

export default App