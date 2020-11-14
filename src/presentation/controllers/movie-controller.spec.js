const MovieController = require('./movie-controller')

const makeSut = () => {
  const sut = new MovieController()

  return {
    sut
  }
}

describe('Movie Controller', () => {
  test('Should return 400 if id movie is not provided', async () => {
    const {sut} = makeSut()
    const event = {
      body: {}
    }

    const res = await sut.storeInformationMovie(event)
    expect(res.statusCode).toBe(400)
  })
})
