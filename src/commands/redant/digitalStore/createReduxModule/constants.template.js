module.exports = ({ constants, name }) => (
  constants
  .map(constant => 
    `export const ${constant} = 'digitalStore/${name}/${constant}'`
  )
  .join('\n')
)
