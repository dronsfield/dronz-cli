const { prompt } = require('inquirer')
const _ = require('lodash')
const path = require('path')
const colors = require('colors')

const { makeFile } = require('../../../../util')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'module name?',
    default: 'newModule'
  },
  {
    type: 'input',
    name: 'methods',
    message: 'what methods?',
    default: 'foo'
  }
]

const run = () => {
  prompt(questions)
  .then(answers => {
    const name = _.camelCase(answers.name)
    const methods = (answers.methods || '').split(' ').map(_.camelCase)

    const constants = methods.map(method => (
      _.snakeCase(method).toUpperCase()
    ))

    const files = {};
    [
      'actions',
      'constants',
      'index',
      'middleware',
      'reducers',
      'selectors',
      'store'
    ]
    .forEach(fileName => {
      const path = `src/store/modules/${name}/${fileName}.js`
      const content = require(`./${fileName}.template`)({ methods, constants, name })
      console.log(path.red)
      console.log(content)
      console.log()
      makeFile(path, content)
    })
  })
}

module.exports = {
  choice: 'create redux module',
  shortcut: ['crm', 'r'],
  run
}
