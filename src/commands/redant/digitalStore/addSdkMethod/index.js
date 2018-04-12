const { prompt } = require('inquirer')
const _ = require('lodash')

const { editFile, makeFile } = require('../../../../util')

// TO DO
// make config file use params from endpoint
// import test utils if not there
// comma in config file
// option to not use test utils

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'method name?',
    default: 'newMethod'
  },
  {
    type: 'input',
    name: 'module',
    message: 'module (eg: users, products, customers)',
    default: 'customers'
  },
  {
    type: 'input',
    name: 'endpoint',
    message: 'endpoint url? (the bit after /v1/)',
    default: 'foo'
  },
  {
    type: 'input',
    name: 'verb',
    message: 'http verb? (eg: get, post)',
    default: 'GET'
  }
]

const run = () => {
  prompt(questions)
  .then(answers => {
    const name = _.camelCase(answers.name) || 'someMethod'
    const sdkModule = _.camelCase(answers.module) || 'products'
    const verb = _.upperCase(answers.verb) || 'GET'
    const endpoint = answers.endpoint || 'something'

    // add method to service file
    editFile(
      `src/services/${sdkModule}Service/${sdkModule}Service.js`,
      lines => lines.findIndex(line => line.indexOf('}') === 0),
      require(`./templates/serviceMethod.template`)({ name, verb })
    )

    // add method to controller file
    editFile(
      `src/controllers/${sdkModule}Controller/${sdkModule}Controller.js`,
      lines => lines.findIndex(line => line.indexOf('}') === 0),
      require(`./templates/controllerMethod.template`)({ name, sdkModule })
    )

    // add mock folder and files for service test
    makeFile(
      `test/services/mocks/${name}Mock/index.js`,
      require(`./templates/mockIndex.template`)({ name })
    )
    makeFile(
      `test/services/mocks/${name}Mock/successResponse.json`,
      require(`./templates/successResponse.template`)()
    )
    makeFile(
      `test/services/mocks/${name}Mock/failResponse.json`,
      require(`./templates/failResponse.template`)()
    )

    // add method to service test file
    editFile(
      `test/services/${sdkModule}Service.test.js`,
      lines => lines.findIndex(line => line.indexOf('}') === 0),
      require(`./templates/serviceTest.template`)({ name, sdkModule })
    )
    editFile(
      `test/services/${sdkModule}Service.test.js`,
      lines => lines.findIndex(line => line.includes('mocks')),
      `import ${name}Mock from './mocks/${name}Mock'`
    )

    // add method to controller test file
    editFile(
      `test/controllers/${sdkModule}Controller.test.js`,
      lines => lines.findIndex(line => line.indexOf('}') === 0),
      require(`./templates/controllerTest.template`)({ name, sdkModule })
    )

    // add api endpoint to config file
    editFile(
      `src/config.js`,
      lines => lines.findIndex(line => line.indexOf('\t\t}') === 0 || line.indexOf('    }') === 0),
      `\t\t\t${name}: () => \`/v1/${endpoint}\``
    )

    // add config test
    editFile(
      `test/config.test.js`,
      lines => {
        const start = lines.findIndex(
          line => (
            line.indexOf(`\tdescribe('endpointUrls'`) === 0 ||
            line.indexOf(`  describe('endpointUrls'`) === 0
          )
        )
        console.log({ start })
        return (
          // -1 +
          start +
          lines.slice(start).findIndex(
            line => (
              line.indexOf('\t}') === 0 ||
              line.indexOf('  }') === 0
            )
          )
        )
      },
      require(`./templates/configTest.template`)({ name, endpoint })
    )

    // add link to docs root
    editFile(
      `docs/index.md`,
      lines => {
        const sectionStart = lines.findIndex(line => line.indexOf(`### [${_.startCase(sdkModule)}]`) === 0)
        const lastLineOfSection = lines.slice(sectionStart).findIndex(line => line.length === 0 || line.slice(0, 1) === ' ')
        return sectionStart + lastLineOfSection
      },
      `* [${_.startCase(name)}](${sdkModule}/${name}.md)`
    )
    
    // add link to module docs
    editFile(
      `docs/${sdkModule}/index.md`,
      lines => {
        return lines.findIndex(line => line.length === 0 || line.slice(0, 1) === ' ')
      },
      `* [${_.startCase(name)}](${name}.md)`
    )

    // add doc
    makeFile(
      `docs/${sdkModule}/${name}.md`,
      require(`./templates/doc.template`)({ name, sdkModule })
    )
  })
}

module.exports = {
  choice: 'add sdk method',
  shortcut: ['sdkm', 's'],
  run
}
