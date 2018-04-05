const _ = require('lodash')

const classCase = str => _.startCase(str).replace(/ /g, '')

module.exports = ({ methods, constants, name }) => (
`import * as constants from './constants'

class ${classCase(name)}Actions {${methods.map((method, i) => (`
  ${method} = () => ({
    type: constants.${constants[i]}
  })`)).join('\n')}
}

export default new ${classCase(name)}Actions()
`)
