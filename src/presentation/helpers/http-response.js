const { ServerError, UnauthorizedError } = require('../errors')

class HttpResponse {
  static success(body) {
    return {
      statusCode: 200,
      body
    }
  }

  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    }
  }

  static unauthorized() {
    return {
      statusCode: 401,
      body: {
        error: new UnauthorizedError()
      }
    }
  }

  static serverError() {
    return {
      statusCode: 500,
      body: {
        error: new ServerError().message
      }
    }
  }
}

module.exports = HttpResponse
