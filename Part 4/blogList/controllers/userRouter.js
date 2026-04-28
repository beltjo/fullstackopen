const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('', async (request, response) => {
  const { username, password, name } = request.body

  //validate the username and password
  if (username.length < 3 || password.length < 3) {
    response.status(400).json('Username or password is too short.')
    return
  }



  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('', async(request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

module.exports = userRouter