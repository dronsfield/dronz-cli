const makeComponentFileFromFolder = require('./makeComponentFileFromFolder')
const igChecker = require('./igChecker')

const commands = {
  makeComponentFileFromFolder,
  igChecker
}

module.exports = {
  choice: 'dronz',
  message: 'mhm?',
  commands
}
