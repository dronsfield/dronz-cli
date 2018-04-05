module.exports = ({ name }) => (
`import fetchMock from 'fetch-mock'
import successResponse from './successResponse'
import failResponse from './failResponse'

import { createMock } from '../../../util'

export default createMock({
  successResponse,
  failResponse,
  endpointName: '${name}'
})
`
)
