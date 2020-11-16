require('dotenv/config')

module.exports = {
  MONGO_URL: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`,
  THE_MOVIE_DB_URL: process.env.THE_MOVIE_DB_URL,
  SECRET_TOKEN: process.env.SECRET_TOKEN
}
