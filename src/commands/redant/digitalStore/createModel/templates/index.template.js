module.exports = ({ fileName }) => {
  return `import ${fileName} from './${fileName}'

export default ${fileName}

`
}
