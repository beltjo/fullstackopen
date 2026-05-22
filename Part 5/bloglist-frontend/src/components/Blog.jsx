import { useState } from 'react'

const Blog = ({ blog, blogs, likeBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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