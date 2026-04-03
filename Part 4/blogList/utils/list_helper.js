const logger = require('./logger')


const dummy = (array) => {
  logger.info('Input array: ', array)
  return 1
}

const countLikes = (array) => {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue['likes'], 0)
}



module.exports = { dummy, countLikes }