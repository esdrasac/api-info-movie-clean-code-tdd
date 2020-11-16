const { api } = require('../helpers/the-movie-db-helper')

class TheMovieDbRepo {
  async getMovieDetailsById(idMovie) {
    if(!idMovie) {
      return null
    }

    const movie = await api.get(`movie/${idMovie}`, {
      params: {
        api_key: '42dbcd306a0cab5174caf331b401355f'
      }
    })

    return movie.data
  }

  async getMovieTranslations(idMovie) {
    if(!idMovie) {
      return null
    }

    const movie = await api.get(`movie/${idMovie}/translations`, {
      params: {
        api_key: '42dbcd306a0cab5174caf331b401355f'
      }
    })

    return movie.data
  }
}

module.exports = TheMovieDbRepo
