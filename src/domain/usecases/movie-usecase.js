class MovieUseCase {
  constructor({ theMovieDbRepository, movieInternalRepository, validator }) {
    this.theMovieDbRepository = theMovieDbRepository
    this.movieInternalRepository = movieInternalRepository
    this.validator = validator
  }

  async getMovieInfos(idMovie) {
    let movieDetails = await this.theMovieDbRepository.getMovieDetailsById(idMovie)

    if(!movieDetails) {
      return null
    }

    const movieTranslations = await this.theMovieDbRepository.getMovieTranslations(idMovie)

    movieDetails['translations'] = movieTranslations.translations

    return movieDetails    
  }

  async addMovie(movie) {
    const shapeSchema = [
      {name: 'id', type: 'number', required: true},
      {name: 'original_title', type: 'string', required: true},
      {name: 'translations', type: 'object', required: true}
    ]

    const schema = await this.validator.validate(shapeSchema, movie)
    if(!schema.isValid) {
      return schema
    }
    
    const addedMovie = await this.movieInternalRepository.create(movie)

    return {
      isValid: true,
      addedMovie
    }
  }
}

module.exports = MovieUseCase
