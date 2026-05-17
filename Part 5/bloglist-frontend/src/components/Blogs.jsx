import Blog from './Blog.jsx'

const Blogs = ({ blogs, setBlogs, user }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
    )}
  </div>
)

export default Blogs