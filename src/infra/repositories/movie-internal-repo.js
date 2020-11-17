const MongoHelper = require('../helpers/mongo-db-helper')
const movieSchema = require('../../domain/models/Movie')

class MovieInternalRepo {
  async create(movie) {
    if(!movie) {
      return null
    }

    const movieModel = await MongoHelper.getOrCreateCollection('movies', movieSchema)
    const addMovie = await movieModel.create(movie)

    return addMovie
  }
}

module.exports = MovieInternalRepo
