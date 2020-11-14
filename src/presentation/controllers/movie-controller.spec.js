const MovieController = require('./movie-controller')
const { ValidatorError, ServerError } = require('../errors')
const movieSchema = require('../test/schemas/movie.json')

const makeSut = () => {
  const validatorStub = makeValidatorStub()
  const movieAuthUseCase = makeMovieUseCase()
  const sut = new MovieController(validatorStub, movieAuthUseCase)

  return {
    sut,
    validatorStub
  }
}

const makeMovieUseCase = () => {
  class MovieUseCaseStub {
    addMovieById(idMovie) {
      if(idMovie === movieSchema.id){
        return movieSchema
      }
      return null
    }
  }

  return new MovieUseCaseStub()
}

const makeValidatorStub = () => {
  class ValidatorStub {
    validate(schema, eventBody) {
      const validation = {
        isValid: true,
        err: {}
      }

      for(const each of schema) {
        if(!eventBody[each.field]){
          validation.isValid = false
          validation.err[each.field] = 'Dados Inválidos' 
        }
      }

      return validation
    }
  }

  return new ValidatorStub()
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
})
