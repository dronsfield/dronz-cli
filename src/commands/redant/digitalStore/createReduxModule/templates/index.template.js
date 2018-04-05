module.exports = () => (
`import store from './store'
import actions from './actions'
import middleware from './middleware'
import * as constants from './constants'
import * as selectors from './selectors'

export { store, actions, constants, middleware, selectors }
`)