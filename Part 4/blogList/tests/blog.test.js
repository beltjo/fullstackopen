const { test } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')

const blog =
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 70
  }

test('toJson', () => {
  //Create a blog
  const testBlog = new Blog(blog)

  //Convert it to json
  const jsonBlog = testBlog.toJSON()

  //Validate that it has no _id and has only an id field.
  console.log(jsonBlog)
  console.log(jsonBlog['_id'])
  assert(jsonBlog['id'])
  assert(jsonBlog['_id'] === undefined)
})