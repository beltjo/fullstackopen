import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { homePath } from '../paths'
import { Button, TextField } from '@mui/material'
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
      props.setNotificationMessage( { message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} has been added.`, type: 'success' } )
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
        <TextField label="title" value={title} onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        <TextField label="author" value={author} onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        <TextField label="url" value={url} onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <Button type="submit" variant='contained' style={{ marginTop: 10 }}>Create Blog</Button>
    </form>
  </div>
}

export default CreateForm