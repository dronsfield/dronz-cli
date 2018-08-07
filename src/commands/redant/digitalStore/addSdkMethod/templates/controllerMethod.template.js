module.exports = ({ name, sdkModule }) => (`
  ${name} = ${sdkModule}Service.${name}
`
)
