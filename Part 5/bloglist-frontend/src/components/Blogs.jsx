import Blog from './Blog.jsx'

const Blogs = ({ blogs, setBlogs}) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
    )}
  </div>  
)

export default Blogs