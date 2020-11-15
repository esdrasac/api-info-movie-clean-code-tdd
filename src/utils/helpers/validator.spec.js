const Validator = require('./validator')

const makeSut = () => {
  const sut = new Validator()

  return {
    sut
  }
}

describe('Validator', () => {
  test('Shold return true if schema is valid', async () => {
    const { sut } = makeSut()

    const isValid = sut.validate([
      {name: 'id', type: 'number', required: true},
      {name: 'original_title', type: 'string', required: true},
      {name: 'translations', type: 'string', required: true},
    ], {
      id: 238,
      original_title: 'any_title',
      translations: [
        {
          language: 'EN'
        }
      ]
    })

    expect(isValid).toBeTruthy()
  })

  test('Shold return false if schema is not valid', async () => {
    const { sut } = makeSut()

    const isValid = sut.validate([
      {name: 'id', type: 'number', required: true},
      {name: 'original_title', type: 'string', required: true},
      {name: 'translations', type: 'string', required: true},
    ], {
      original_title: 'any_title',
    })

    expect(isValid).toBeTruthy()
  })
})
