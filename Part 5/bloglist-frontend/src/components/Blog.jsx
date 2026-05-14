import {useState} from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <div>likes {blog.likes} <button>like</button> </div>
        <div>{blog.author}</div>
      </>
    )}
  </div>  
  )
}

export default Blog