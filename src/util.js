const fs = require('fs')
const mkdirp = require('mkdirp')
const { dirname } = require('path')

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

module.exports = {
  getChoices,
  makeFile
}