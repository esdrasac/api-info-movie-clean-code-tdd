const MovieUseCase = require('./movie-usecase')
const movieDatailSchema = require('../test/schemas/movie-detail.json')
const movieTranslationSchema = require('../test/schemas/movie-translation.json')
const { makeValidatorStub } = require('../../test/mocks/validator-mock')
const movieSchema = require('../../test/schemas/movie.json')
const ValidatorError  = require('../../utils/errors/validator-error')

const makeSut = () => {
  const theMovieDbRepository = makeTheMovieDbRepository()
  const movieInternalRepository = makeMovieInternalRepository()
  const validator = makeValidatorStub()
  const sut = new MovieUseCase({ theMovieDbRepository, movieInternalRepository, validator })

  return {
    sut,
    validator,
    theMovieDbRepository,
    movieInternalRepository
  }
}

const makeMovieInternalRepository = () => {
  class MovieInternalRepositoryStub {
    async create(movie) {
      return true
    }
  }

  return new MovieInternalRepositoryStub()
}

const makeTheMovieDbRepository = () => {
  class TheMovieDbRepositoryStub {
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

  return new TheMovieDbRepositoryStub()
}

describe('Movie UseCase', () => {
  test('[Function: getMovieInfos] Should call MovieExternalRepository with valid id', async () => {
    const { sut, theMovieDbRepository } = makeSut()

    const movieExternalRepoParams = jest.spyOn(theMovieDbRepository, 'getMovieDetailsById')

    const id = 238

    await sut.getMovieInfos(id)

    expect(movieExternalRepoParams).toHaveBeenCalledWith(id)
  })

  test('[Function: getMovieInfos] Should return null from MovieExternalRepository if movie is not founded', async () => {
    const { sut, theMovieDbRepository } = makeSut()

    const movieExternalRepoParams = jest.spyOn(theMovieDbRepository, 'getMovieDetailsById')
      .mockImplementationOnce(null)

    const id = 238

    await sut.getMovieInfos(id)

    expect(movieExternalRepoParams).toHaveBeenCalledWith(id)
  })

  test('[Function: addMovie] Should return false if internal repo can not add movie', async () => {
    const { sut, movieInternalRepository } = makeSut()

    jest.spyOn(movieInternalRepository, 'create').mockImplementationOnce(false)

    const movie = {}

    const addMovie = await sut.addMovie(movie)

    expect(addMovie.addedMovie).toBeFalsy()
  })

  test('[Function: addMovie] Should return true if movie is valid', async () => {
    const { sut } = makeSut()

    const movie = movieSchema

    const addMovie = await sut.addMovie(movie)

    expect(addMovie.addedMovie).toBeTruthy()
    expect(addMovie.isValid).toBeTruthy()
  })

  test('[Function: addMovie] Should return false from if movie is not valid', async () => {
    const { sut } = makeSut()

    const movie = {}

    const addMovie = await sut.addMovie(movie)

    expect(addMovie.isValid).toBeFalsy()
  })
})
