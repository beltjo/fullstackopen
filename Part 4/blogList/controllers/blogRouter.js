const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const body = request.body

  //Get and validate the token.
  let token = null
  const authorization = request.get('authorization')
  if ( authorization && authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '')
  }
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user,
    url: body.url,
    likes: body.likes
  })

  if( !blog['title'] || !blog['url']) {
    response.status(400).json('Missing title or url.')
    return
  }

  if( !blog['likes']) {
    blog['likes'] = 0
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
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