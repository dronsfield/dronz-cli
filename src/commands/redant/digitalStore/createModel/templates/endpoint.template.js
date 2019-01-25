const { upperFirstChar } = require('../../../../../util')

module.exports = ({ modelName, fileNames }) => {
  const className = upperFirstChar(fileNames.endpoint)
  return `import _ from 'lodash'
import ${fileNames.controller} from '../../controllers/${fileNames.controller}'

class ${className} {

}

export default new ${className}()

`
}
