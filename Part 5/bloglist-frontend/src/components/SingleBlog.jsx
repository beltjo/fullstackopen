

const SingleBlog = ({ blog, deleteBlog, likeBlog, user }) => {
  console.log('SingleBlog:', blog)

  if (!blog) {
    return null
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
    OwnsBlog = blog.user.name === user.name
  }
  return (
    <div style={blogStyle}>
      {blog.author}: {blog.title}
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes} { user && <button onClick={() => {likeBlog(blog)}}>like</button> } </div>
      <div>Added by {blog.user.name}</div>
      { OwnsBlog && <div><button onClick={() => deleteBlog(blog)}>delete</button></div> }
    </div>
  )

}

export default SingleBlog