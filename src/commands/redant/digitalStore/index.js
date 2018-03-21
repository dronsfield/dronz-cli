const { prompt } = require('inquirer')

const { getChoices } = require('../../../util')

const fs = require('fs')
const mkdirp = require('mkdirp')
const { dirname } = require('path')

const commands = {
  sdkControllerTest: {
    choice: 'make sdk controller test',
    run: () => {
      console.log('beep boop')

      const path = 'test/long/ass/path/lmao.txt'
      const content = '¯\\_(ツ)_/¯'
      mkdirp(dirname(path), err => {
        if (err) {
          throw err
        }
        else {
          fs.writeFile(path, content, err => {
            if (err) {
              throw err
            }
          })
        }
      })
    }
  },
  nothing: {
    choice: 'nothing much',
    run: () => {
      console.log('k.')
    }
  }
}

module.exports = {
  choice: 'digital store',
  run: () => {
    prompt({
      type: 'list',
      name: 'init',
      message: 'what do?',
      choices: getChoices(commands)
    })
    .then(({ init }) => {
      commands[init].run()
    })
  }
}