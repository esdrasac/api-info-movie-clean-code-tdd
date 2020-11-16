const axios = require('axios').default

exports.api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
})
