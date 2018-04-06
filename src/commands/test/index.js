const fs = require('fs')
const _ = require('lodash')

const getCheckDigit = s => {
  var result = 0
  for (var counter = s.length - 1; counter >= 0; counter--) {
    result = result + parseInt(s.charAt(counter)) * (1 + (2 * (counter % 2)))
  }
  return (10 - (result % 10)) % 10
}

const generateEAN13 = i => {
  const firstDigit = 8
  const nextFourDigits = i % 10000
  const nextSevenDigits = _.random(9999999)
  const firstTwelveDigits = '' + firstDigit + nextFourDigits + nextSevenDigits
  const checkDigit = getCheckDigit(firstTwelveDigits)
  return firstTwelveDigits + checkDigit
}

module.exports = {
  choice: 'test filler crap',
  run: () => {
    const path = `server/import/products/dummy/variants.csv`
    const eanStart = 59
    const file = fs.readFileSync(path, 'utf8')

    const newFile = (
      file
      .split('\n')
      .map((line, i) => {
        const eanLength = line.slice(eanStart).indexOf('"')
        const newLine = (
          line.slice(0, eanStart) +
          generateEAN13(i) +
          line.slice(eanStart + eanLength)
        )
        return newLine
      })
      .join('\n')
    )

    fs.writeFileSync(path, newFile)
  },
  shortcut: 't'
}
