const { prompt } = require('inquirer')
const _ = require('lodash')

const { makeFile } = require('../../../../util')

const questions = [
  {
    type: 'path',
    name: 'path',
    message: 'component path?'
  }
]

const create = (answers) => {
  const componentPath = answers.path
  const name = componentPath.split('/').slice(-1)

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
}

const run = ({ args }) => {
  console.log({ args })
  if (args.arg1) {
    create({ path: args.arg1 })
  } else {
    prompt(questions)
      .then(create)
  }
}

module.exports = {
  choice: 'create component',
  shortcut: ['c'],
  run
}
