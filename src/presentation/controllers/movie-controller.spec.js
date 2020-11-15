const MovieController = require('./movie-controller')
const { ServerError } = require('../errors')
const ValidatorError = require('../../utils/errors/validator-error')
const movieSchema = require('../../test/schemas/movie.json')
const { makeValidatorStub } = require('../../test/mocks/validator-mock')

const makeSut = () => {
  const Validator = makeValidatorStub()
  const MovieUseCase = makeMovieUseCase()
  const sut = new MovieController({ Validator, MovieUseCase })

  return {
    sut,
    Validator,
    MovieUseCase
  }
}

const makeMovieUseCase = () => {
  class MovieUseCaseStub {
    getMovieInfos(idMovie) {
      if(idMovie === movieSchema.id){
        this.movie = movieSchema

        return this.movie
      }
      return null
    }

    addMovie(movie) {
      return {
        isValid: true
      }
    }
  }

  return new MovieUseCaseStub()
}

describe('Movie Controller', () => {
  test('Should return 400 if id movie is not provided', async () => {
    const { sut } = makeSut()
    const event = {
      body: {}
    }

    const res = await sut.storeInformationMovie(event)
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe(new ValidatorError({idMovie: 'Dados Inválidos'}).message)
  })

  test('Should return 500 if event request is not provided', async () => {
    const { sut } = makeSut()
    const event = {}

    const res = await sut.storeInformationMovie(event)
    expect(res.statusCode).toBe(500)
    expect(res.body.error).toBe(new ServerError().message)
  })

  test('Should return 200 if movie is founded', async () => {
    const { sut } = makeSut()
    const event = {
      body: {
        idMovie: 238
      }
    }

    const res = await sut.storeInformationMovie(event)
    expect(res.statusCode).toBe(200)
  })

  test('Should return 404 if movie is not founded', async () => {
    const { sut } = makeSut()
    const event = {
      body: {
        idMovie: 258
      }
    }

    const res = await sut.storeInformationMovie(event)
    expect(res.statusCode).toBe(404)
  })

  test('Should return 500 if can not add movie', async () => {
    const { sut, MovieUseCase } = makeSut()
    
    jest.spyOn(MovieUseCase, 'addMovie').mockReturnValue({ isvalid: false })

    const event = {
      body: {
        idMovie: 238
      }
    }

    const res = await sut.storeInformationMovie(event)
    expect(res.statusCode).toBe(400)
  })

  test('Should return 200 if movie is added', async () => {
    const { sut } = makeSut()
    
    const event = {
      body: {
        idMovie: 238
      }
    }

    const res = await sut.storeInformationMovie(event)
    expect(res.statusCode).toBe(200)
  })
})
