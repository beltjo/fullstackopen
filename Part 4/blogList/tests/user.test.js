const { test } = require('node:test')
const User = require('../models/user')
const assert = require('node:assert')

const user =
  {
    username: 'bbBuilder',
    password: 'fake_hash',
    name: 'Bob',
  }

test('toJson', () => {
  //Create a user
  const testUser = new User(user)

  //Convert it to json
  const jsonUser = testUser.toJSON()

  //Validate that it has no _id and has only an id field.
  console.log(jsonUser)
  console.log(jsonUser['_id'])
  assert(jsonUser['id'])
  assert(jsonUser['_id'] === undefined)
})