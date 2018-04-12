const getFakeParams = endpoint => {
  const params = endpoint.match(/:([a-zA-Z]+)/g)
  if (params && params.length) {
    return `{ ${params.map(param => `${param.replace(':','')}: '${param}`).join(', ')}' }`
  } else {
    return ''
  }
}

module.exports = ({ name, endpoint }) => (
`    describe('${name}', function () {
      it(\`should return /v1/${endpoint}\`, function () {
        const id = uuid()
        const result = config.getConfig().endpointUrls.${name}(${getFakeParams(endpoint)})
        expect(result).to.equal('/v1/${endpoint}')
      })
    })`
)
