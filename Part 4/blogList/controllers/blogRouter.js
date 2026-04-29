const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const blog = new Blog(request.body)

  if( !blog['title'] || !blog['url']) {
    response.status(400).json('Missing title or url.')
    return
  }

  if( !blog['likes']) {
    blog['likes'] = 0
  }

  if ( !blog['user']) {
    const users = await User.find({})
    blog.user = users[0]['_id']
  }

  const result = await blog.save()
  const blogUser = await User.findById(blog.user)
  blogUser.blogs = blogUser.blogs.concat(result._id)
  await blogUser.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  console.log(request.params.id)
  const id = request.params.id

  const blog = await Blog.findByIdAndDelete(id)
  console.log('Deleted:', blog)
  response.status(200).json(blog)
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  console.log(id)
  console.log(request.body)

  let blog
  try {
    blog = await Blog.findByIdAndUpdate(id, request.body, { returnDocument:'after' } )
  } catch {
    response.status(404).json('Invalid id')
  }
  console.log(blog)


  response.status(201).json(blog)
})


module.exports = blogRouter