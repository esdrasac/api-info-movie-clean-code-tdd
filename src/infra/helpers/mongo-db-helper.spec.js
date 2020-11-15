const sut = require('./mongo-db-helper')
const movieSchema = require('../../domain/models/Movie')

describe('Mongo helper', () => {
  beforeAll(async () => {
    await sut.connect('mongodb://localhost:27017/api-info-movie')
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('', async () => {
    expect(sut.client).toBeTruthy()
    await sut.disconnect()
    expect(sut.client).toBeFalsy()
    await sut.getOrCreateCollection('movies', movieSchema)
    expect(sut.client).toBeTruthy()
  })
})
