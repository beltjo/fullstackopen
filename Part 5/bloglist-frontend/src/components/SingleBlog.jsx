import { Box, Button, Link, Typography  } from '@mui/material'

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
    <Box component='section' sx={{ p:2, border:'1px solid grey' }}>
      <Typography variant='h2'> {blog.title} </Typography>
      <Typography variant='h6'> created by {blog.author}</Typography>
      <Typography variant='h6'><Link variant='inherit' href={blog.url}>{blog.url}</Link></Typography>
      <Typography variant='h5'>likes {blog.likes} { user && <Button variant='outlined' onClick={() => {likeBlog(blog)}}>like</Button> } </Typography>
      <Typography>Added by {blog.user.name}</Typography >
      { OwnsBlog && <Button variant='outlined' onClick={() => deleteBlog(blog)}>delete</Button> }
    </Box>
  )

}

export default SingleBlog