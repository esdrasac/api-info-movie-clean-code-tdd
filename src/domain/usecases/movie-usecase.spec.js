const MovieUseCase = require('./movie-usecase')
const movieDatailSchema = require('../test/schemas/movie-detail.json')
const movieTranslationSchema = require('../test/schemas/movie-translation.json')

const makeSut = () => {
  const MovieExternalRepository = makeMovieExternalRepository()
  const sut = new MovieUseCase({ MovieExternalRepository })

  return {
    sut,
    MovieExternalRepository
  }
}

const makeMovieExternalRepository = () => {
  class MovieExternalRepositoryStub {
    async getMovieDetailsById(idMovie) {
      if(idMovie === movieDatailSchema.id) {
        this.idMovie = idMovie
        this.movieDatail = movieDatailSchema
        return this.movieDatail
      }

      return null
    }

    async getMovieTranslations(idMovie) {
      if(idMovie === movieTranslationSchema.id) {
        this.movieTranslation = movieTranslationSchema
        return this.movieTranslation
      }

      return null
    }
  }

  return new MovieExternalRepositoryStub()
}

describe('Movie UseCase', () => {
  test('Should call MovieExternalRepository with valid id', async () => {
    const { sut, MovieExternalRepository } = makeSut()

    const movieExternalRepoParams = jest.spyOn(MovieExternalRepository, 'getMovieDetailsById')

    const id = 258

    await sut.getMovieInfos(id)

    expect(movieExternalRepoParams).toHaveBeenCalledWith(id)
  })

  test('Should return null from MovieExternalRepository if movie is not founded', async () => {
    const { sut, MovieExternalRepository } = makeSut()

    const movieExternalRepoParams = jest.spyOn(MovieExternalRepository, 'getMovieDetailsById')

    const id = 238

    await sut.getMovieInfos(id)

    expect(movieExternalRepoParams).toHaveBeenCalledWith(id)
  })
})
