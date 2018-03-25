module.exports = ({ methods, constants, name }) => (
`import _ from 'lodash'
import { createSelector } from 'reselect'

export const getFoo = state.${name}.foo
`)
