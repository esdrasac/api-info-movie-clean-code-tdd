const axios = require('axios').default
const env = require('../../main/config/env')

exports.api = axios.create({
  baseURL: env.THE_MOVIE_DB_URL
})
