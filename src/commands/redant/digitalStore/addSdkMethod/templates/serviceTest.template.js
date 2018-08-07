module.exports = ({ name, sdkModule }) => (
`  testServiceMethod({
    methodName: '${name}',
    method: ${sdkModule}Service.${name},
    mock: ${name}Mock
  })`
)
