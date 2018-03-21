const { Command, flags } = require('@oclif/command')
const { prompt } = require('inquirer')
const _ = require('lodash/fp')

const { getChoices } = require('./util')

const redant = require('./commands/redant')
const test = require('./commands/test')

const commands = { redant, test }

class DronzCliCommand extends Command {
  async run () {
    const { flags } = this.parse(DronzCliCommand)

    prompt({
      type: 'list',
      name: 'init',
      message: 'what do you want to do?',
      choices: getChoices(commands)
    })
    .then(({ init }) => {
      commands[init].run()
    })
  }
}

DronzCliCommand.description = `
Describe the command here
...
Extra documentation goes here
`

DronzCliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version(),
  // add --help flag to show CLI version
  help: flags.help(),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DronzCliCommand
