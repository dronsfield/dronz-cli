const _ = require('lodash')
const { prompt } = require('inquirer')

const { readFile, makeFile } = require('../../../util')

const questions = [
  {
    type: 'input',
    name: 'path',
    message: 'path?'
  }
]

const expectedFiles = ['gql', 'styled', 'enhance', 'index']

const run = () => {
  prompt(questions)
  .then(answers => {
    const path = answers.path

    const importLines = []
    const otherLines = []

    expectedFiles.forEach(fileName => {
      const content = readFile(`${path}/${fileName}.js`)
      const lines = content.split('\n')
      importLines.push(...lines.filter(line => line.startsWith('import')))
      otherLines.push(`//${fileName.replace('index', 'component')}${_.repeat('-', 40 - fileName.length)}`)
      otherLines.push(...lines.filter(line => !line.startsWith('import')))
    })

    const newFileContent = [...importLines, ...otherLines].join('\n')
    makeFile(`${path}.js`, newFileContent)
  })
}

module.exports = {
  choice: 'make component file from folder',
  shortcut: ['mcfff', 'mc'],
  run
}
