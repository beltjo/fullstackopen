const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')

const users = [
  {
    username: 'bbBuilder',
    passwordHash: 'fake_hash',
    name: 'Bob',
  },
  {
    username: 'doug',
    passwordHash: 'fake_hash2',
    name: 'Doug',
  }
]

const base_url = '/api/users'

const api = supertest(app)

test('filler', () => {

})

beforeEach(async () => {
  await User.deleteMany({})
  const userModels = users.map(user => new User(user))
  const userPromises = userModels.map(user => user.save())
  await Promise.all(userPromises)
})

describe('Get users', () => {
  test('Get all users', async () => {
    const response = await api.get(base_url)

    assert.strictEqual(response.body.length, 2)
  })

})


describe('Create users', () => {

  test('Create new user', async () => {
    const newUser = {
      username: 'steven1',
      password: 'strong_password',
      name: 'Sam'
    }
    await console.log('hello')
    const response = await api
      .post(base_url)
      .send(newUser)
      .expect(201)

    const afterCreate = await api
      .get(base_url)

    console.log(response.body)
    console.log('---')
    console.log(afterCreate.body)
    assert.deepStrictEqual(afterCreate.body[2], response.body)
    assert.strictEqual(afterCreate.body.length, 3)
    assert.strictEqual(response.body['username'], newUser['username'])
    assert.strictEqual(response.body['name'], newUser['name'])

  })

  test('Fail to create a duplicate user', async () => {
    const newUser = {
      username: users[0]['username'],
      password: 'strong passcode',
      name: users[0]['name']
    }

    await api
      .post(base_url)
      .send(newUser)
      .expect(400)

    const afterCreate = await api
      .get(base_url)


    assert.strictEqual(afterCreate.body.length, 2)
  })

  test('Fail to create a user, invalid password', async () => {
    const newUser = {
      username: users[0]['username'] + '1234',
      password: 'a',
      name: users[0]['name']
    }

    await api
      .post(base_url)
      .send(newUser)
      .expect(400)

    const afterCreate = await api
      .get(base_url)


    assert.strictEqual(afterCreate.body.length, 2)
  })

  test('Fail to create a user, invalid username', async () => {
    const newUser = {
      username: 'a',
      password: 'strong password',
      name: users[0]['name']
    }

    await api
      .post(base_url)
      .send(newUser)
      .expect(400)

    const afterCreate = await api
      .get(base_url)


    assert.strictEqual(afterCreate.body.length, 2)
  })


})

after(async () => {
  await mongoose.connection.close()
})