class ValidatorError extends Error {
  constructor(obj) {
    super(`Validation fails: ${obj}`)
    this.name = 'ValidatorError'
  }
}

module.exports =  ValidatorError
