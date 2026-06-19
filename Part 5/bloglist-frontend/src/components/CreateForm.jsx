import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { homePath } from '../paths'
const CreateForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try{
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      const returnedBlog = await props.postBlog(blogObject)
      props.setBlogs(props.blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setNotificationMessage( { message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} has been added.`, type: 'alert' } )
      navigate(homePath)
    } catch (error) {
      console.error(error)
      props.setNotificationMessage( { message: `${error.response.data}`, type: 'error' } )
    }
  }


  return <div>
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>
        <label>
          title:
          <input placeholder="write title here" type="text" value={title} onChange={ ({ target }) => setTitle(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          author:
          <input placeholder="write author here" type="text" value={author} onChange={ ({ target }) => setAuthor(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          url:
          <input placeholder="write url here" type="text" value={url} onChange={ ({ target }) => setUrl(target.value)}/>
        </label>
      </div>
      <button type="submit">Create Blog</button>
    </form>
  </div>
}

export default CreateForm