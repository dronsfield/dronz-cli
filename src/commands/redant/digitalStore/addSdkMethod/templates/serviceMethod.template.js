module.exports = ({ name, verb }) => (`
  ${name} = params => {
    return fetch(config.config.endpointUrls.${name}(params), {
      method: '${verb}'
    })
  }`
)
