import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {



  return (
    <div>
      {blogs.map(blog => {
        const path = `/blogs/${blog.id}`
        return <div> <Link to={path} >{blog.title} by {blog.author}</Link> </div>
      }
      )}
    </div>
  )
}

export default BlogList