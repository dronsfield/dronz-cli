module.exports = ({ modelName }) => (
`const createTableColumns = require('./util/createTableColumns')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('${modelName}s', createTableColumns({
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false
      },
      someOtherModelId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'someOtherModels', key: 'id' }
      },
      name: {
        type: Sequelize.STRING(512),
        allowNull: false
      },
      details: {
        type: Sequelize.JSONB,
        allowNull: false
      }
    }, { timestamps: true, paranoid: true }))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('${modelName}s')
  }
}
`
)
