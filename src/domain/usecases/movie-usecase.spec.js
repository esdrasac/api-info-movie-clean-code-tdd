const MovieUseCase = require('./movie-usecase')
const movieDatailSchema = require('../test/schemas/movie-detail.json')
const movieTranslationSchema = require('../test/schemas/movie-translation.json')
const { makeValidatorStub } = require('../../test/mocks/validator-mock')
const movieSchema = require('../../test/schemas/movie.json')
const ValidatorError  = require('../../utils/errors/validator-error')

const makeSut = () => {
  const MovieExternalRepository = makeMovieExternalRepository()
  const MovieInternalRepository = makeMovieInternalRepository()
  const Validator = makeValidatorStub()
  const sut = new MovieUseCase({ MovieExternalRepository, MovieInternalRepository, Validator })

  return {
    sut,
    Validator,
    MovieExternalRepository,
    MovieInternalRepository
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
  test('[Function: getMovieInfos] Should call MovieExternalRepository with valid id', async () => {
    const { sut, MovieExternalRepository } = makeSut()

    const movieExternalRepoParams = jest.spyOn(MovieExternalRepository, 'getMovieDetailsById')

    const id = 238

    await sut.getMovieInfos(id)

    expect(movieExternalRepoParams).toHaveBeenCalledWith(id)
  })

  test('[Function: getMovieInfos] Should return null from MovieExternalRepository if movie is not founded', async () => {
    const { sut, MovieExternalRepository } = makeSut()

    const movieExternalRepoParams = jest.spyOn(MovieExternalRepository, 'getMovieDetailsById')
      .mockImplementationOnce(null)

    const id = 238

    await sut.getMovieInfos(id)

    expect(movieExternalRepoParams).toHaveBeenCalledWith(id)
  })

  test('[Function: addMovie] Should return false if internal repo can not add movie', async () => {
    const { sut, MovieInternalRepository } = makeSut()

    jest.spyOn(MovieInternalRepository, 'create').mockImplementationOnce(false)

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
