const { prompt } = require('inquirer')
const _ = require('lodash')

const { makeFile } = require('../../../../util')

const questions = [
  {
    type: 'input',
    name: 'path',
    message: 'component path?',
    default: 'src/Foo'
  }
]

const run = () => {
  prompt(questions)
  .then(answers => {
    const componentPath = answers.path
    const name = componentPath.split('/').slice(-1)

    console.log({ answers, componentPath })

    ;[
      'COMP',
      'style',
      'index'
    ]
    .forEach(fileName => {
      const path = `${componentPath}/${fileName === 'COMP' ? name : fileName}.js`
      const content = require(`./templates/${fileName}.template`)({ name })
      console.log(path.red)
      console.log(content)
      console.log()
      makeFile(path, content)
    })
  })
}

module.exports = {
  choice: 'create component',
  shortcut: ['c'],
  run
}
