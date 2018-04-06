module.exports = ({ name, sdkModule }) => (`
  ${name} = params => {
    return ${sdkModule}Service
      .${name}(params)
  }`
)
