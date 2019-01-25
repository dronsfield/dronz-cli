const { prompt } = require('inquirer')
const _ = require('lodash')
const moment = require('moment')

const { editFile, makeFile } = require('../../../../util')

const createModel = (modelName) => {

  // model definition
  makeFile(
    `server/models/${modelName}.js`,
    require(`./templates/model.template`)({ modelName })
  )

  // migration
  makeFile(
    `server/migrations/${moment().format('YYYY-MM-DD')}-001-create-${modelName}s-table.js`,
    require(`./templates/migration.template`)({ modelName })
  )

  // service, controller, and endpoints
  const fileNames = {
    service: `${modelName}sService`,
    controller: `${modelName}sController`,
    endpoint: `${modelName}sEndpoints`
  }
  _.forEach(fileNames, (fileName, layer) => {
    makeFile(
      `server/v1/${layer}s/${fileName}/${fileName}.js`,
      require(`./templates/${layer}.template`)({ modelName, fileNames })
    )
    makeFile(
      `server/v1/${layer}s/${fileName}/index.js`,
      require(`./templates/index.template`)({ fileName })
    )
  })

  // add model to sequelize config
  // - import model
  const importModel = () => editFile(
    `server/sequelize.js`,
    lines => _.findLastIndex(lines, line => line.startsWith('import')) + 1,
    `import ${modelName}Model from './models/${modelName}'`
  )
  // - add comma to last model currently in array
  const addComma = () => editFile(
    `server/sequelize.js`,
    lines => _.findIndex(lines, line => line === ']') - 1,
    line => line + ',',
    null,
    true
  )
  // - add new model to array
  const addModelToArray = () => editFile(
    `server/sequelize.js`,
    lines => _.findIndex(lines, line => line === ']'),
    `\t${modelName}Model`
  )
  importModel()
    .then(addComma)
    .then(addModelToArray)

  // import endpoints to api.js
  editFile(
    `server/v1/api.js`,
    lines => _.findLastIndex(lines, line => line.startsWith('import')),
    `import ${fileNames.endpoint} from './endpoints/${fileNames.endpoint}'`,
  )
}

const run = ({ args }) => {
  const modelName = args.arg1
  if (modelName) {
    createModel(modelName)
  } else {
    throw new Error('modelName required')
  }
}

module.exports = {
  choice: 'create model',
  shortcut: ['m', 'model'],
  run
}
