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

const base_url = '/api/blogs'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogModels = blogs.map(blog => new Blog(blog))
  const blogPromises = blogModels.map(blog => blog.save())
  await Promise.all(blogPromises)
})

test('validate get api', async () => {
  const response = await api.get(base_url)

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
      .post(base_url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    // console.log('Post response:' + JSON.stringify(response.body))
    const getResponse = await api.get(base_url)
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
      .post(base_url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    // console.log('Post response:' + JSON.stringify(response.body))
    const getResponse = await api.get(base_url)
    // console.log(getResponse.body)
    //Validate the request
    assert.strictEqual(getResponse.body.length, 3, 'Did not add another blog!')
    assert.strictEqual(getResponse.body[2]['title'], payload['title'])
    assert.strictEqual(getResponse.body[2]['author'], payload['author'])
    assert.strictEqual(getResponse.body[2]['url'], payload['url'])
    assert.strictEqual(getResponse.body[2]['likes'], 0)

  })

  test('post api with no url', async () => {
    //Build the request
    const payload =   {
      title: 'Supertest npm package',
      author: 'Supertest team',
    }
    //Send the request
    await api
      .post(base_url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)

    // console.log('Post response:' + JSON.stringify(response.body))
    const getResponse = await api.get(base_url)
    // console.log(getResponse.body)
    //Validate the request
    assert.strictEqual(getResponse.body.length, 2, 'A blog was added!')


  })

  test('post api with no title', async () => {
    //Build the request
    const payload =   {
      author: 'Supertest team',
      url: 'https://www.npmjs.com/package/supertest',
    }
    //Send the request
    await api
      .post(base_url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)

    // console.log('Post response:' + JSON.stringify(response.body))
    const getResponse = await api.get(base_url)
    // console.log(getResponse.body)
    //Validate the request
    assert.strictEqual(getResponse.body.length, 2, 'A blog was added!')

  })

})

describe('Delete API', async () => {
  test('Delete non-existing id', async () => {

    //Create the delete request
    const fake_id = 1

    // //Send the request
    await api.delete(`/api/blogs/${fake_id}`)

    // //Validate the result
    const response = await api.get(base_url)
    assert.strictEqual(response.body.length, 2)
  })

  test('Delete id', async () => {
    // Since ids are randomly generated, first get the id from the database.
    const beforeDelete = await api.get(base_url)

    //Create the delete request
    const id = beforeDelete.body[0]['id']
    //Send the request
    await api.delete(`/api/blogs/${id}`)

    //Validate the result
    const response = await api.get(base_url)
    assert.strictEqual(response.body.length, 1)
    assert.deepStrictEqual(beforeDelete.body[1], response.body[0])
  })
})

describe('Put api', () => {

  test('Update title', async () => {
    //Create the request
    const payload = { 'title' : 'New title' }
    const beforePut = await api.get(base_url)
    const id = beforePut.body[0]['id']


    //Send the request
    const response = await api
      .put(`${base_url}/${id}`)
      .send(payload)
      .expect(201)

    //Validate the request
    const afterPut = await api.get(base_url)

    const updatedBlog = response.body
    assert.strictEqual(afterPut.body[0]['id'], updatedBlog['id'])
    assert.strictEqual(afterPut.body[0]['title'], updatedBlog['title'])
    assert.strictEqual(afterPut.body[0]['author'], updatedBlog['author'])
    assert.strictEqual(afterPut.body[0]['url'], updatedBlog['url'])
    assert.strictEqual(afterPut.body[0]['likes'], updatedBlog['likes'])

    assert.strictEqual(payload['title'], updatedBlog['title'])

    // await console.log('Hello')
  })

  test('Update author', async () => {
    //Create the request
    const payload = { 'author' : 'New author' }
    const beforePut = await api.get(base_url)
    const id = beforePut.body[0]['id']


    //Send the request
    const response = await api
      .put(`${base_url}/${id}`)
      .send(payload)
      .expect(201)

    //Validate the request
    const afterPut = await api.get(base_url)

    const updatedBlog = response.body
    assert.strictEqual(afterPut.body[0]['id'], updatedBlog['id'])
    assert.strictEqual(afterPut.body[0]['title'], updatedBlog['title'])
    assert.strictEqual(afterPut.body[0]['author'], updatedBlog['author'])
    assert.strictEqual(afterPut.body[0]['url'], updatedBlog['url'])
    assert.strictEqual(afterPut.body[0]['likes'], updatedBlog['likes'])

    assert.strictEqual(payload['author'], updatedBlog['author'])
    // await console.log('Hello')
  })

  test('Update url', async () => {
    //Create the request
    const payload = { 'url' : 'New url' }
    const beforePut = await api.get(base_url)
    const id = beforePut.body[0]['id']


    //Send the request
    const response = await api
      .put(`${base_url}/${id}`)
      .send(payload)
      .expect(201)

    //Validate the request
    const afterPut = await api.get(base_url)

    const updatedBlog = response.body
    assert.strictEqual(afterPut.body[0]['id'], updatedBlog['id'])
    assert.strictEqual(afterPut.body[0]['title'], updatedBlog['title'])
    assert.strictEqual(afterPut.body[0]['author'], updatedBlog['author'])
    assert.strictEqual(afterPut.body[0]['url'], updatedBlog['url'])
    assert.strictEqual(afterPut.body[0]['likes'], updatedBlog['likes'])

    assert.strictEqual(payload['url'], updatedBlog['url'])

    // await console.log('Hello')
  })

  test('Update likes', async () => {
    //Create the request
    const payload = { 'likes' : 20 }
    const beforePut = await api.get(base_url)
    const id = beforePut.body[0]['id']


    //Send the request
    const response = await api
      .put(`${base_url}/${id}`)
      .send(payload)
      .expect(201)
    console.log(response.body)
    //Validate the request
    const afterPut = await api.get(base_url)
    const updatedBlog = response.body
    assert.strictEqual(afterPut.body[0]['id'], updatedBlog['id'])
    assert.strictEqual(afterPut.body[0]['title'], updatedBlog['title'])
    assert.strictEqual(afterPut.body[0]['author'], updatedBlog['author'])
    assert.strictEqual(afterPut.body[0]['url'], updatedBlog['url'])
    assert.strictEqual(afterPut.body[0]['likes'], updatedBlog['likes'])

    assert.strictEqual(payload['likes'], updatedBlog['likes'])
    // await console.log('Hello')
  })

  test('Invalid Id', async () => {
    //Create the request
    const fake_id = 1
    const payload = { 'likes' : 20 }

    //Send the request
    await api
      .put(`${base_url}/${fake_id}`)
      .send(payload)
      .expect(404)

  })
})

after(async () => {
  await mongoose.connection.close()
})