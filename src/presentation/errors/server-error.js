class ServerError extends Error {
  constructor(err) {
    super(`Internal error: ${err}`)
    this.name('ServerError')
  }
}

module.exports = ServerError
