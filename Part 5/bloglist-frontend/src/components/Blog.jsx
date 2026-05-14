import {useState} from 'react'

const Blog = ({ blog }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  const buttonText = detailsVisible ? 'hide' : 'show'
  return (
  <div>
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