module.exports = ({ name, sdkModule }) => (`
  testControllerMethod({
    methodName: '${name}',
    method: ${sdkModule}Controller.${name},
    service: ${sdkModule}Service,
    serviceName: '${sdkModule}Service',
    sandbox
  })`
)
