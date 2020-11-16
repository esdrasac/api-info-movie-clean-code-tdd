const MongoHelper = require('../infra/helpers/mongo-db-helper')

MongoHelper.connect()
  .then(() => {
    const app = require('./app')
    app.listen(process.env.PORT, () => {
      console.log('app listening on port 5000')
    })
  })

