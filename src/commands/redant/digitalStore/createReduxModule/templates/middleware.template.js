const _ = require('lodash')

const classCase = str => _.startCase(str).replace(/ /g, '')

module.exports = ({ methods, constants, name }) => (
`import * as constants from './constants'

class ${classCase(name)}Middleware {
  someMiddleware = ({ dispatch, getState }) => next => action => {
    // do things
    next(action)
  }
}
  
export default new ${classCase(name)}Middleware()
`)
  