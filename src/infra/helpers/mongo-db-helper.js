const mongoose = require('mongoose')
const movieModel = require('../../domain/models/Movie')
const env = require('../../main/config/env')

module.exports = {
  async connect() {
    if(this.client){
      return
    }

    this.client = await mongoose.connect(env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect() {
    this.client.disconnect()
    this.client = null
  },

  async getOrCreateCollection(collection, schema) {
    await this.connect()

    try {
      return mongoose.model(collection)
    } catch (err) {
      return mongoose.model(collection, schema)
    }
  }
}
