const { prompt } = require('inquirer')

const { getChoices, makeFile } = require('../../../util')

const createReduxModule = require('./createReduxModule')

const fs = require('fs')
const mkdirp = require('mkdirp')
const { dirname } = require('path')

const commands = {
  sdkControllerTest: {
    choice: 'make sdk controller test',
    shortcut: 'sdkct',
    run: () => {
      console.log('beep boop')

      const path = 'test/long/ass/path/lmao.txt'
      const content = '¯\\_(ツ)_/¯'
      makeFile(path, content)
    }
  },
  nothing: {
    choice: 'nothing much',
    shortcut: 'nada',
    run: () => {
      console.log('k.')
    }
  },
  createReduxModule: {
    choice: 'create redux module',
    shortcut: ['crm', 'r'],
    run: createReduxModule
  }
}

module.exports = {
  choice: 'digital store',
  message: 'what do?',
  commands
}