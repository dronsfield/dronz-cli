const { prompt } = require('inquirer')

const { getChoices } = require('../../util')

const digitalStore = require('./digitalStore')
const general = require('./general')

const commands = { digitalStore, general }

module.exports = {
  choice: 'redant stuff',
  message: 'what project?',
  commands
}
