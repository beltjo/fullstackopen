const logger = require('./logger')
const _ = require('lodash')

const dummy = (array) => {
  logger.info('Input array: ', array)
  return 1
}

const countLikes = (array) => {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue['likes'], 0)
}

const favoriteBlog = (array) => {
  if(array.length === 0) {
    return null
  }

  return array.reduce((accumulator, currentValue) => {
    if (accumulator['likes'] > currentValue['likes']) {
      return accumulator
    } else {
      return currentValue
    }
  })
}

const mostBlogsByAuthor = (array) => {
  if (array.length === 0) {
    return null
  }

  const blogsByAuthor = _.groupBy(array, (element) => { return element.author })
  logger.info('blogs by author', blogsByAuthor)
  const blogsByCount = _.mapValues(blogsByAuthor, (element => {
    return element.length
  }))
  logger.info('blog count by author', blogsByCount)

  var max2 = 0
  var maxKey = null
  for (const [key, value] of Object.entries(blogsByCount)) {
    if( value > max2) {
      max2 = value
      maxKey = key
    }
  }

  return { 'author': maxKey, 'blogs': max2 }
}


module.exports = { dummy, countLikes,favoriteBlog, mostBlogsByAuthor }