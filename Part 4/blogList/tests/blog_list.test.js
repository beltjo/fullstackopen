const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { default: mongoose } = require('mongoose')

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogModels = blogs.map(blog => new Blog(blog))
  const blogPromises = blogModels.map(blog => blog.save())
  await Promise.all(blogPromises)
})

test('validate get api', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2, 'Length of blogs does not match expected!')
  const regex = new RegExp(/application\/json/, 'i')
  console.log(response.header)
  assert(regex.test(response.header['content-type']), 'Response is not json!')

})


describe('post api', () => {
  test('validate post api', async () => {
    //Build the request
    const payload =   {
      title: 'Supertest npm package',
      author: 'Supertest team',
      url: 'https://www.npmjs.com/package/supertest',
      likes: 12000,
    }
    //Send the request
    await api
      .post('/api/blogs')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    // console.log('Post response:' + JSON.stringify(response.body))
    const getResponse = await api.get('/api/blogs')
    // console.log(getResponse.body)
    //Validate the request
    assert.strictEqual(getResponse.body.length, 3, 'Did not add another blog!')
    assert.strictEqual(getResponse.body[2]['title'], payload['title'])
    assert.strictEqual(getResponse.body[2]['author'], payload['author'])
    assert.strictEqual(getResponse.body[2]['url'], payload['url'])
    assert.strictEqual(getResponse.body[2]['likes'], payload['likes'])

  })

  test('post api with no likes', async () => {
    //Build the request
    const payload =   {
      title: 'Supertest npm package',
      author: 'Supertest team',
      url: 'https://www.npmjs.com/package/supertest',
    }
    //Send the request
    await api
      .post('/api/blogs')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    // console.log('Post response:' + JSON.stringify(response.body))
    const getResponse = await api.get('/api/blogs')
    // console.log(getResponse.body)
    //Validate the request
    assert.strictEqual(getResponse.body.length, 3, 'Did not add another blog!')
    assert.strictEqual(getResponse.body[2]['title'], payload['title'])
    assert.strictEqual(getResponse.body[2]['author'], payload['author'])
    assert.strictEqual(getResponse.body[2]['url'], payload['url'])
    assert.strictEqual(getResponse.body[2]['likes'], 0)

  })
})




after(async () => {
  await mongoose.connection.close()
})