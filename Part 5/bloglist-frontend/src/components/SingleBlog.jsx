import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'

const SingleBlog = ({ blogs, setBlogs, user }) => {
  const id = useParams().id
  const blog = blogs.find(blog => id === blog.id)

  const likeBlog = async (blog, blogs) => {
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

  const deleteBlog = async (blog, blogs) => {
    console.log('Starting delete of ', blog)

    const choice = window.confirm(`Are you sure you want to delete ${blog.title}?`)

    if (choice) {
      const response = await blogService.deleteBlog(blog)
      const blogsWithoutItem = blogs.filter( (blog) => {
        return blog.id !== response.id
      })
      setBlogs(blogsWithoutItem)
    }

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  let OwnsBlog = false
  if (user) {
    OwnsBlog = blog.author === user.name
  }
  return (
    <div style={blogStyle}>
      {blog.author}: {blog.title}
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={() => {likeBlog(blog, blogs)}}>like</button> </div>
      <div>Added by {blog.author}</div>
      { OwnsBlog && <div><button onClick={() => deleteBlog(blog, blogs)}>delete</button></div> }
    </div>
  )

}

export default SingleBlog