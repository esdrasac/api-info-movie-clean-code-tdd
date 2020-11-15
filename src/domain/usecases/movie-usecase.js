class MovieUseCase {
  constructor({ MovieExternalRepository, Validator }) {
    this.movieExternalRepository = MovieExternalRepository
    this.validator = Validator
  }

  async getMovieInfos(idMovie) {
    let movieDetails = await this.movieExternalRepository.getMovieDetailsById(idMovie)

    if(!movieDetails) {
      return null
    }

    const movieTranslations = await this.movieExternalRepository.getMovieTranslations(idMovie)

    movieDetails['translations'] = movieTranslations.translations

    return movieDetails    
  }

  async addMovie(movie) {
    const shapeSchema = [
      {field: 'id', type: 'number', required: true},
      {field: 'original_title', type: 'string', required: true},
      {field: 'translations', type: 'object', required: true}
    ]

    const schema = await this.validator.validate(shapeSchema, movie)

    if(!schema.isValid) {
      return schema
    }

    return {
      isValid: true
    }
  }
}

module.exports = MovieUseCase
