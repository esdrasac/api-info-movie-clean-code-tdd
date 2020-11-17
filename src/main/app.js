require('dotenv/config')

const express = require('express')
const http = require('http')
const cors = require('cors')

const routes = require('./routes')

class App {
  constructor() {
    this.httpServer = express()
    this.server = http.Server(this.httpServer)

    this.middleware()
    this.router()
  }

  middleware() {
    this.httpServer.use(cors())
    this.httpServer.use(express.json())
  }

  router() {
    this.httpServer.use(routes)
  }
}


module.exports = new App().server
