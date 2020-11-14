class MovieUseCase {
  constructor({ MovieExternalRepository }) {
    this.movieExternalRepository = MovieExternalRepository
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
}

module.exports = MovieUseCase
