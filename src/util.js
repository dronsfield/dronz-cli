const getChoices = commands => Object.keys(commands).map(key => {
  return {
    name: commands[key].choice,
    value: key
  }
})

module.exports = {
  getChoices
}