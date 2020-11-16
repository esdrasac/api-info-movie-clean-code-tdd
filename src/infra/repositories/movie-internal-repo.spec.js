const MongoHelper = require('../helpers/mongo-db-helper')
const MovieInternalRepo = require('./movie-internal-repo')

const movieSchema = require('../../domain/models/Movie')
const movie = require('../../test/schemas/movie.json')
let movieModel

const makeSut = () => {
  return new MovieInternalRepo()
}

describe('Movie Internal Repo', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017/api-info-movie')
    // await MongoHelper.initModels()
    movieModel = await MongoHelper.getOrCreateCollection('movies', movieSchema)
  })

  beforeEach(async () => {
    await movieModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  
  test('Should return null if can not add movie', async () => {
    const sut = makeSut()
    const user = await sut.create()
    expect(user).toBeNull()
  })

  test('Should return movie if add success', async () => {
    const sut = makeSut()
    const user = await sut.create(movie)
    expect(user._id).toBeTruthy()
  })
})
