const TheMovieDbRepo = require('./the-movie-db-repo')
const webService = require('../helpers/the-movie-db-helper')

const makeSut = () => {
  return new TheMovieDbRepo()
}

describe('Movie Internal Repo', () => {
  test('[Function: getMovieDetailsById] Should return null if  idMovie is not provided', async () => {
    const sut = makeSut()
    const movie = await sut.getMovieDetailsById()
    expect(movie).toBeNull()
  })

  test('[Function: getMovieDetailsById] Should return null if movie is not founded', async () => {
    const sut = makeSut()
    const id = 0
    const movie = await sut.getMovieDetailsById(id)
    expect(movie).toBeNull()
  })
  
  test('[Function: getMovieDetailsById] Should return movie if idMovie is valid', async () => {
    const sut = makeSut()
    const id = 238
    const movie = await sut.getMovieDetailsById(id)
    expect(movie.id).toBe(id)
  })

  test('[Function: getMovieTranslations] Should return null if  idMovie is not provided', async () => {
    const sut = makeSut()
    const translations = await sut.getMovieTranslations()
    expect(translations).toBeNull()
  })

  test('[Function: getMovieTranslations] Should return null if movie is not founded', async () => {
    const sut = makeSut()
    const id = 0
    const translations = await sut.getMovieTranslations(id)
    expect(translations).toBeNull()
  })

  test('[Function: getMovieTranslations] Should return translations if idMovie is valid', async () => {
    const sut = makeSut()
    const id = 238
    const translations = await sut.getMovieTranslations(id)
    expect(translations.id).toBe(id)
  })
})
