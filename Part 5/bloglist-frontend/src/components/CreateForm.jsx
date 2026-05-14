import blogService from '../services/blogs'
import { useState } from 'react'


const CreateForm = (props) => {
  console.log('props of createForm:', props)
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
      
      props.setBlogs(props.blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setNotificationMessage( { message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} has been added.`, type: "alert" } )
    } catch (error) {
      console.error(error)
      props.setNotificationMessage( { message: `${error.response.data}`, type: "error" } )
    }
  }


  return <div>
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
}

export default CreateForm