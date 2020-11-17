const { ServerError } = require('../errors')

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

  static notFounded(error) {
    return {
      statusCode: 404,
      body: {
        error: error
      }
    }
  }

  static serverError(error) {
    return {
      statusCode: 500,
      body: {
        error: new ServerError(error).message
      }
    }
  }
}

module.exports = HttpResponse
