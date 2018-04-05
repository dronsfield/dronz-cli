module.exports = ({ name, endpoint }) => (
`    describe('${name}', function () {
      it(\`should return /v1/${endpoint}\`, function () {
        const id = uuid()
        const result = config.getConfig().endpointUrls.${name}()
        expect(result).to.equal('/v1/${endpoint}')
      })
    })`
)
