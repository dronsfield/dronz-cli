const { Command, flags } = require('@oclif/command')
const inquirer = require('inquirer')
const _ = require('lodash')
const colors = require('colors')

inquirer.registerPrompt('path', require('inquirer-path').PathPrompt)

const { nestedPrompt } = require('./util')

const redant = require('./commands/redant')
const dronz = require('./commands/dronz')
const test = require('./commands/test')

const commands = { redant, dronz, test }

const addShortcuts = ({ commands, shortcuts = {} }) => {
  Object.values(commands).forEach(({ commands, shortcut, run }) => {
    if (commands) {
      addShortcuts({ commands, shortcuts })
    }
    if (shortcut) {
      if (Array.isArray(shortcut)) {
        shortcut.forEach(s => {
          shortcuts[s] = run || _.noop
        })
      } else {
        shortcuts[shortcut] = run || _.noop
      }
    }
  })
  return shortcuts
}

class DronzCliCommand extends Command {
  async run () {
    const { flags } = this.parse(DronzCliCommand)
    const { args: { commandName, ...args } } = this.parse(DronzCliCommand)
    // console.log({ flags })

    if (commandName) {
      const command = addShortcuts({ commands })[commandName]
      if (command) {
        command({ flags, args })
      }
      else {
        console.log(`invalid command name '${commandName}'`)
      }
    }
    else {
      nestedPrompt({
        message: 'what do you want to do?',
        commands
      })
    }
  }
}
DronzCliCommand.args = [
  { name: 'commandName' },
  { name: 'arg1' }
]

DronzCliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version(),
  // add --help flag to show CLI version
  help: flags.help(),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DronzCliCommand
