module.exports = ({ name, sdkModule }) => (`
  testControllerMethod({
    controller: ${sdkModule}Controller,
    controllerFunctionName: '${name}',
    service: ${sdkModule}Service,
    sandbox
  })`
)
