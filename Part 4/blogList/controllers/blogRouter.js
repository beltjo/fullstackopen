const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
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

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  console.log(request.params.id)
  const id = request.params.id

  const blog = await Blog.findByIdAndDelete(id)
  console.log('Deleted:', blog)
  response.status(200).json(blog)
})


module.exports = blogRouter