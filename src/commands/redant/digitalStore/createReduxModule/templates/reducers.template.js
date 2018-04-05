const _ = require('lodash')

const classCase = str => _.startCase(str).replace(/ /g, '')

module.exports = ({ methods, constants, name }) => (
`import * as constants from './constants'
import { promiseReducer } from '../../util'

class ${classCase(name)}Reducers {${methods.map((method, i) => (`
  ${method} = (state, action) => {
    if (true) {
      return {
        ...state,
        foo: 'bar'
      }
    } else {
      return state
    }
  }`)).join('\n')}
}

export default new ${classCase(name)}Reducers()
`)
