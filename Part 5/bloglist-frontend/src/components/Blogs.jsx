import Blog from './Blog.jsx'
import blogService from '../services/blogs.js'

const Blogs = ({ blogs, setBlogs, user }) => {
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

  return <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} blogs={blogs} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user}/>
    )}
  </div>
}

export default Blogs