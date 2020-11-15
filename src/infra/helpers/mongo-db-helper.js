const mongoose = require('mongoose')

module.exports = {
  async connect(uri) {
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

  async getOrCreateCollection(collection, Schema) {
    if(!this.client) {
      await this.connect(this.uri)
    }
    
    const schema = this.client.Schema(Schema)
    const model = this.client.model(collection, schema)

    return model
  }
}
