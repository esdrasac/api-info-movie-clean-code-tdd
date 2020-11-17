const sut = require('./mongo-db-helper')
const movieSchema = require('../../domain/models/Movie')

describe('Mongo helper', () => {
  beforeAll(async () => {
    await sut.connect()
  })

  afterAll(async () => {
    await sut.disconnect()
  })
  
  test('Should reconnect when client is disconnect', async () => {
    expect(sut.client).toBeTruthy()
    await sut.disconnect()
    expect(sut.client).toBeFalsy()
    await sut.getOrCreateCollection('movies', movieSchema)
    expect(sut.client).toBeTruthy()
  })

  test('Should connect when client is disconnect', async () => {
    await sut.connect()
    expect(sut.client).toBeTruthy()
  })
})
