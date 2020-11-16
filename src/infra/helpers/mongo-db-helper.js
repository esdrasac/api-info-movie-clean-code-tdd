const mongoose = require('mongoose')
const movieModel = require('../../domain/models/Movie')

const Models = [
  {
    name: 'movies',
    schema: movieModel
  }
]

module.exports = {
  async connect(uri) {
    if(this.client){
      return
    }
    
    this.uri = uri
    this.client = await mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    
  },

  async disconnect() {
    this.client.disconnect()
    this.client = null
  },

  async getOrCreateCollection(collection, schema) {
    await this.connect(this.uri)

    try {
      return mongoose.model(collection)
    } catch (err) {
      return mongoose.model(collection, schema)
    }
  }
}
