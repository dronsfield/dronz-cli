const { prompt } = require('inquirer')

const { getChoices, makeFile } = require('../../../util')

const createReduxModule = require('./createReduxModule')

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
      makeFile(path, content)
    }
  },
  nothing: {
    choice: 'nothing much',
    run: () => {
      console.log('k.')
    }
  },
  createReduxModule: {
    choice: 'create redux module',
    run: createReduxModule
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