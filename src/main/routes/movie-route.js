const MovieRouterComposer = require('../composers/movie-router-compose')
const { adapt } = require('../adapters/route-adapter')
const authMiddleware = require('../middlewares/auth')

const movieRouteComposed = MovieRouterComposer.compose()

module.exports = route => {
  route.use(authMiddleware)
  route.post('/add-movie', adapt(movieRouteComposed.storeInformationMovie.bind(movieRouteComposed)))
}
