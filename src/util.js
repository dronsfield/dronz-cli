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

const fsDefaultCallback = err => {
  if (err) {
    throw err
  }
}
const makeFile = (path, content, cb = fsDefaultCallback) => {
  mkdirp(dirname(path), err => {
    if (err) {
      throw err
    } else {
      fs.writeFile(path, content, cb)
    }
  })
}

// path: file to edit
// getLine: function, lines => lineNumber
// content: what to insert
// cb: what to do after
const editFile = (path, getLine, content, cb = fsDefaultCallback) => {
  fs.readFile(
    path,
    'utf8',
    (err, data) => {
      if (err) {
        throw err
      } else {
        const lines = data.split('\n')
        const n = getLine(lines)
        lines.splice(n, 0, content)
        const toWrite = lines.join('\n')
        makeFile(path, toWrite, cb)
      }
    }
  )
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
  editFile,
  nestedPrompt
}
