const fs = require('fs')
const mkdirp = require('mkdirp')
const { dirname } = require('path')
const { prompt } = require('inquirer')
const _ = require('lodash')
const { Console } = require('console');
const { Transform } = require('stream');

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
  return new Promise((resolve, reject) => {
    mkdirp(dirname(path), err => {
      if (err) {
        throw err
      } else {
        fs.writeFile(path, content, (err) => {
          cb(err)
          resolve()
        })
      }
    })
  })
}

// path: file to edit
// getLine: function, lines => lineNumber
// content: what to insert
// cb: what to do after
const editFile = (path, getLine, content, cb, replaceLine = false) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path,
      'utf8',
      (err, data) => {
        if (err) {
          throw err
        } else {
          const lines = data.split('\n')
          let n = getLine(lines)
          const newLine = (
            _.isFunction(content)
            ? content(lines[n] || '')
            : content
          )
          if (n >= 0) {
            lines.splice(n, Number(replaceLine), newLine)
          } else {
            lines.push(newLine)
          }
          const toWrite = lines.join('\n')
          resolve(makeFile(path, toWrite, (cb || fsDefaultCallback)))
        }
      }
    )
  })
}

const readFile = (path) => {
  return fs.readFileSync(path, 'utf8')
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

const upperFirstChar = (str) => {
  return (str || '').charAt(0).toUpperCase() + str.slice(1)
}

// https://stackoverflow.com/a/69874540/16446917
function printTable(input) {
  // @see https://stackoverflow.com/a/67859384
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })
  logger.table(input)
  const table = (ts.read() || '').toString()
  let result = '';
  for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    result += `${r}\n`;
  }
  console.log(result);
}


module.exports = {
  getChoices,
  makeFile,
  editFile,
  readFile,
  nestedPrompt,
  upperFirstChar,
  printTable
}
