const response = require('../helpers/http-response')
const { ValidatorError } = require('../errors')

class MovieController {
  constructor(validator){
    this.validator = validator

  }

  async storeInformationMovie(event) {
    try {
      const shapeSchema = [
        {field: 'idMovie', type: 'number', required: true}
      ]
  
      const schema = await this.validator.validate(shapeSchema, event.body)
  
      if(!schema.isValid) {
        return response.badRequest(new ValidatorError(schema.err))
      }

    } catch(err) { 
      return response.serverError(err)
    }
  }
}

module.exports = MovieController
