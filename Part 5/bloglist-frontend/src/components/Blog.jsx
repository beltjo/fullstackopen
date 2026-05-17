import {useState} from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user}) => {
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

  const deleteBlog = async (blog, blogs) => {
    console.log("Starting delete of ", blog)

    const choice = window.confirm(`Are you sure you want to delete ${blog.title}?`)

    if (choice) {
      const response = await BlogService.deleteBlog(blog)
      const blogsWithoutItem = blogs.filter( (blog) => {
        return blog.id !== response.id
      })
      setBlogs(blogsWithoutItem)
    }
    
  } 


  const [detailsVisible, setDetailsVisible] = useState(false)

  const buttonText = detailsVisible ? 'hide' : 'show'
  //This isn't the best way to determine ownership.  Really, it would depend on how we attribute ownership.  If the one that uploads the entry has ownership, then we want
  // to store the uploaded as the owner.  If we want the owner to be the author, we would want a way to denote a unique id to the author rather than just compare the names 
  // of the user to the author.  For ease, we'll just match the name and understand the limitation in the design if this would be expanded.
  const OwnsBlog = blog.author === user.name
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={ () => { setDetailsVisible(!detailsVisible) }}>{buttonText}</button>
    { detailsVisible && (
      <>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={ () => { likeBlog(blog, blogs) }}>like</button> </div>
        <div>{blog.author}</div>
        { OwnsBlog && (<div><button onClick={ () => deleteBlog(blog, blogs)}>delete</button></div>) } 
      </>
    )}
  </div>  
  )
}

export default Blog