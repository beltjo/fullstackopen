import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {



  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map(blog => {
          const path = `/blogs/${blog.id}`
          return <li key={blog.id} > <Link  to={path} >{blog.title} by {blog.author}</Link> </li>
        })}
      </ul>

    </div>
  )
}

export default BlogList