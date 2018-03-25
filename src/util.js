const fs = require('fs')
const mkdirp = require('mkdirp')
const { dirname } = require('path')
const { prompt } = require('inquirer')

const getChoices = commands => Object.keys(commands).map(key => {
  return {
    name: commands[key].choice,
    value: key
  }
})

const makeFileDefaultCallback = err => {
  if (err) {
    throw err
  }
}
const makeFile = (path, content, cb = makeFileDefaultCallback) => {
  mkdirp(dirname(path), err => {
    if (err) {
      throw err
    }
    else {
      fs.writeFile(path, content, cb)
    }
  })
}

const nestedPrompt = ({ message = 'what now?', commands, run }) => {
  if (commands) {
    prompt({
      type: 'list',
      name: 'next',
      message,
      choices: getChoices(commands)
    })
    .then(({ next }) => {
      nestedPrompt(commands[next])
    })
  } else if (run) {
    run()
  }
}

module.exports = {
  getChoices,
  makeFile,
  nestedPrompt
}