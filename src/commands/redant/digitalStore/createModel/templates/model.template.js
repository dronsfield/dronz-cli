module.exports = ({ modelName }) => (
`import Sequelize from 'sequelize'
import uuidv4 from 'uuid/v4'
import _ from 'lodash'

export default {
  name: '${modelName}',
  fields: {
    id: {
      type: Sequelize.UUID,
      defaultValue: uuidv4,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(512),
      allowNull: false
    },
    details: {
      type: Sequelize.JSONB,
      allowNull: false
    }
  },
  options: {
    defaultScope: {
      where: {
        deletedAt: null
      }
    },
    timestamps: true,
    paranoid: true,
    tableName: '${modelName}s'
  },
  relationships: ({ ${modelName}, someOtherModel }) => {
    ${modelName}.belongsTo(someOtherModel, { as: 'someOtherModel' })
    ${modelName}.prototype.toJSON = function () {
      const privateAttributes = ['deletedAt', 'createdAt', 'updatedAt']
      return _.omit(this.dataValues, privateAttributes)
    }
  }
}
`)
