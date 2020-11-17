const { Router } = require('express')
const router = new Router()

require('./movie-route')(router)

module.exports = router
