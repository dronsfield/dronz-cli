const { Command, flags } = require('@oclif/command')
const inquirer = require('inquirer')
const _ = require('lodash')
const colors = require('colors')

inquirer.registerPrompt('path', require('inquirer-path').PathPrompt)

const { nestedPrompt, printTable } = require('./util')

const redant = require('./commands/redant')
const dronz = require('./commands/dronz')
const test = require('./commands/test')

const commands = { redant, dronz, test }

const addShortcuts = ({ commands, shortcuts = {} }) => {
  Object.values(commands).forEach((command) => {
    const { commands, shortcut, run } = command
    if (commands) {
      addShortcuts({ commands, shortcuts })
    }
    if (shortcut) {
      if (Array.isArray(shortcut)) {
        shortcut.forEach(s => {
          // shortcuts[s] = run || _.noop
          shortcuts[s] = command
        })
      } else {
        shortcuts[shortcut] = command
      }
    }
  })
  return shortcuts
}

class DronzCliCommand extends Command {
  async run () {
    const { flags } = this.parse(DronzCliCommand)
    const { args: { commandName, ...args } } = this.parse(DronzCliCommand)

    const shortcuts = addShortcuts({ commands })
    if (commandName) {
      if (commandName === 'help') {
        printTable(_.sortBy(_.keys(shortcuts).map(shortcutKey => {
          return { shortcut: shortcutKey, description: shortcuts[shortcutKey].choice }
        }), ["description"]), )
      } else {
        const command = shortcuts[commandName]
        if (command && command.run) {
          command.run({ flags, args })
        } else {
          console.log(`invalid command name '${commandName}'`)
        }
      }
    } else {
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
