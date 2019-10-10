class ErrorHandles extends Error {
  constructor (msg) {
    super(msg)
    this.name = this.constructor.name
    this.status = 404
  }

  statusCode () {
    return this.status
  }
}

module.exports = ErrorHandles
