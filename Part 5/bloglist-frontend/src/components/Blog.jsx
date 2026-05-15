import {useState} from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async (blog, blogs) => {
    console.log(blog)
    console.log(blogs)
    const response = await BlogService.LikeBlog(blog)
    console.log('LikeBlog response: ', response)

    const blogsWithoutOldItem = blogs.filter( (blog) => {
      return blog.id !== response.id
    })
    const updatedBlogs = blogsWithoutOldItem.concat(response)
    console.log("Updated blogs to new list: ", updatedBlogs)
    updatedBlogs.sort((a, b) => {
      return b.likes - a.likes
    })
    console.log("Sorted blog: ", updatedBlogs)
    setBlogs(updatedBlogs)
  }


  const [detailsVisible, setDetailsVisible] = useState(false)

  const buttonText = detailsVisible ? 'hide' : 'show'
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={ () => { setDetailsVisible(!detailsVisible) }}>{buttonText}</button>
    { detailsVisible && (
      <>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={ () => { likeBlog(blog, blogs) }}>like</button> </div>
        <div>{blog.author}</div>
      </>
    )}
  </div>  
  )
}

export default Blog