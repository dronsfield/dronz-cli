const createReduxModule = require('./createReduxModule')
const addSdkMethod = require('./addSdkMethod')
const createComponent = require('./createComponent')
const createModel = require('./createModel')

const commands = {
  nothing: {
    choice: 'nothing much',
    shortcut: 'nada',
    run: () => {
      console.log('k.')
    }
  },
  createReduxModule,
  addSdkMethod,
  createComponent,
  createModel
}

module.exports = {
  choice: 'digital store',
  message: 'what do?',
  commands
}
