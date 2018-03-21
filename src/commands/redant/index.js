const { prompt } = require('inquirer')

const { getChoices } = require('../../util')

const digitalStore = require('./digitalStore')
const general = require('./general')

const commands = { digitalStore, general }

module.exports = {
  choice: 'redant stuff',
  run: () => {
    prompt({
      type: 'list',
      name: 'init',
      message: 'what project?',
      choices: getChoices(commands)
    })
    .then(({ init }) => {
      commands[init].run()
    })
  }
}
