const logger = require('./logger')


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

module.exports = { dummy, countLikes,favoriteBlog }