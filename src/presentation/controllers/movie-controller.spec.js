const MovieController = require('./movie-controller')
const { ValidatorError } = require('../errors')

const makeSut = () => {
  const validatorStub = makeValidatorStub()
  const sut = new MovieController(validatorStub)

  return {
    sut,
    validatorStub
  }
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
})
