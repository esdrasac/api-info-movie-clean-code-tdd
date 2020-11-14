const response = require('../helpers/http-response')
const ValidatorError = require('../errors/validator.error')

class MovieController {
  constructor(validator){
    this.validator = validator

  }

  async storeInformationMovie(event) {
    const shapeSchema = [
      {field: 'idMovie', type: 'number', required: true}
    ]

    const schema = await this.validator.validate(shapeSchema, event.body)

    if(!schema.isValid) {
      return response.badRequest(new ValidatorError(schema.err))
    }
  }
}

module.exports = MovieController
