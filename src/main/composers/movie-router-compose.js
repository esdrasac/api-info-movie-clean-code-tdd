const MovieController = require('../../presentation/controllers/movie-controller')
const Validator = require('../../utils/helpers/validator')
const MovieUseCase = require('../../domain/usecases/movie-usecase')
const TheMovieDbRepository = require('../../infra/repositories/the-movie-db-repo')
const MovieInternalRepository = require('../../infra/repositories/movie-internal-repo')

class MovieRouterComposer {
  static compose() {
    const validator = new Validator()
    const theMovieDbRepository = new TheMovieDbRepository()
    const movieInternalRepository = new MovieInternalRepository()
    const movieUseCase = new MovieUseCase({
      theMovieDbRepository,
      movieInternalRepository,
      validator
    })

    return new MovieController({
      validator,
      movieUseCase
    })
  }
}

module.exports = MovieRouterComposer
