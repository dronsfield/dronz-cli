const { Command, flags } = require('@oclif/command')
const { prompt } = require('inquirer')
const _ = require('lodash')

const { getChoices } = require('./util')

const redant = require('./commands/redant')
const test = require('./commands/test')

const createReduxModule = require('./commands/redant/digitalStore/createReduxModule')

const commands = { redant, test }

const commandsMap = {
  redux: createReduxModule,
  r: createReduxModule
}

class DronzCliCommand extends Command {
  // static args = [
  //   { name: 'command' }
  // ]

  async run () {
    const { flags } = this.parse(DronzCliCommand)
    const { args: { commandName } } = this.parse(DronzCliCommand)

    if (commandName) {
      const command = commandsMap[commandName]
      if (command) {
        command()
      }
      else {
        console.log(`invalid command name '${commandName}'`)
      }
    }
    else {
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
}
DronzCliCommand.args = [
  { name: 'commandName' }
]

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
