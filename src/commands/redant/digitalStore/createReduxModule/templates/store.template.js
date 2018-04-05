module.exports = ({ methods, constants }) => (
`import * as constants from './constants'
import reducers from './reducers'

export const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {${methods.map((method, i) => (`
    case constants.${constants[i]}:
      return reducers.${method}(state, action)`
)).join('')}
    default:
      return state
  }
}
`
)
