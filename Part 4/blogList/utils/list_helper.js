const logger = require('./logger')


const dummy = (array) => {
  logger.info('Input array: ', array)
  return 1
}


module.exports = { dummy }