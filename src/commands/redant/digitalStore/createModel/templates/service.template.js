const { upperFirstChar } = require('../../../../../util')

module.exports = ({ modelName, fileNames }) => {
  const className = upperFirstChar(fileNames.service)
  return `import _ from 'lodash'

import sequelize from '../../../sequelize'
import { createLogger } from '../../../logger'

const ${modelName} = sequelize.models.${modelName}

class ${className} {

}

export default new ${className}()

`
}
