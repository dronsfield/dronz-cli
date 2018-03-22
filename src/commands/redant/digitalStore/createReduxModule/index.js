const { prompt } = require('inquirer')
const _ = require('lodash/fp')

const { getChoices, makeFile } = require('../../../../util')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'module name?'
  },
  {
    type: 'input',
    name: 'methods',
    message: 'what methods?'
  }
]

const createReduxModule = () => {
  prompt(questions)
  .then(answers => {
    answers.name = 'lmfao'
    answers.methods = 'hello whatTheHeck foo'

    const name = _.camelCase(answers.name)

    const methods = (answers.methods || '').split(' ').map(_.camelCase)

    const constants = methods.map(method =>(
      `digitalStore/${name}/${_.snakeCase(method).toUpperCase()}`
    ))

    console.dir({ name, methods, constants })

  })
}

module.exports = createReduxModule
