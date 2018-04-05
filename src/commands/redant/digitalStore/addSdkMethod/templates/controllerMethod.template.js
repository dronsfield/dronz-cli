module.exports = ({ name, sdkModule }) => (`
  ${name} = params => {
    return ${sdkModule}
      .${name}(params)
  }`
)
