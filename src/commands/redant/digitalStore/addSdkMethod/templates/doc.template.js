module.exports = ({ name, sdkModule }) => (
`### \`${sdkModule}.${name}\`

Does something.

#### Arguments

- \`foo\` *(\`string\`)*: The foo
- \`bar\` *(\`string\`)*: The bar

#### Returns
*(Promise)*: A Promise object which returns something
\`\`\`
{
  a,
  b,
  c
}
\`\`\`

#### Example

\`\`\`javascript

const params = {
  foo,
  bar
}
return digitalStoreSdk.${sdkModule}
  .${name}(params)
  .then(result => {
    // handle the result here
  })
  .catch(error => {
    // handle the error here
  })
\`\`\`

#### Errors

- SOMETHING_WENT_WRONG - RA-XX-01
`
)
