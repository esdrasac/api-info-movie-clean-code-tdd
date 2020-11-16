const request = require('supertest')
const app = require('../app')
const MongoHelper = require('../../infra/helpers/mongo-db-helper')
const movieSchema = require('../../domain/models/Movie')
const env = require('../config/env')
let movieModel

describe('Movie Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
    movieModel = await MongoHelper.getOrCreateCollection('movies', movieSchema)
  })

  beforeAll(async () => {
    await movieModel.deleteMany()
  })
  
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  
  test('Should return 401 when invalid token is provided', async () => {
    await request(app)
      .post('/add-movie')
      .set({'x-api-key': 'any_token', 'Accept': 'application/json'})
      .send({
        idMovie: 238
      })
      .expect(401)
  })

  test('Should return 401 token is not provided', async () => {
    await request(app)
      .post('/add-movie')
      .set({'Accept': 'application/json'})
      .send({
        idMovie: 238
      })
      .expect(401)
  })

  test('Should return 200 when valid params are provided', async () => {
    await request(app)
      .post('/add-movie')
      .set({'x-api-key': env.SECRET_TOKEN, 'Accept': 'application/json'})
      .send({
        idMovie: 238
      })
      .expect(200)
  })

})
