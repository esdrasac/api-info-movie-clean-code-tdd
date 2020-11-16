const response = require('../helpers/http-response')
const ValidatorError = require('../../utils/errors/validator-error')

class MovieController {
  constructor({ validator, movieUseCase }){
    this.validator = validator
    this.movieUseCase = movieUseCase

  }

  async storeInformationMovie(event) {
    console.log(event)
    try {
      const shapeSchema = [
        { name: 'idMovie', type: 'number', required: true }
      ]

      const schema = await this.validator.validate(shapeSchema, event.body)
      
      if(!schema.isValid) {
        return response.badRequest(new ValidatorError(schema.err))
      }
      
      const { idMovie } = event.body
      
      const movie = await this.movieUseCase.getMovieInfos(idMovie)
      
      if(!movie) {
        return response.notFounded('Can not found movie')
      }
      
      const isValidMovie = await this.movieUseCase.addMovie(movie)
      if(!isValidMovie.isValid) {
        return response.badRequest(new ValidatorError('Invalid movie'))
      }

      return response.success(movie)

    } catch(err) { 
      return response.serverError(err)
    }
  }
}

module.exports = MovieController
