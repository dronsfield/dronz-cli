const { upperFirstChar } = require('../../../../../util')

module.exports = ({ modelName, fileNames }) => {
  const className = upperFirstChar(fileNames.controller)
  return `import _ from 'lodash'
import ${fileNames.service} from '../../services/${fileNames.service}'
import otherService from '../../services/otherService'
import DigitalStoreError from '../../../errors/DigitalStoreError'
import * as errors from '../../../errors/errors'
import sequelize from '../../../sequelize'
import { createLogger } from '../../../logger'
import env from '../../../env'

class ${className} {

}

export default new ${className}()

`
}
