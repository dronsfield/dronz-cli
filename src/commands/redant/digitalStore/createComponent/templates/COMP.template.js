module.exports = ({ name }) => (
`import React from 'react'
import { withStyles } from 'material-ui/styles'

import style from './style'

const ${name} = props => {
  return null
}

export default withStyles(style)(${name})
`)
