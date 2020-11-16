const env = require('../config/env')

module.exports = async (req, res, next) => {
  const token = req.headers['x-api-key']

  if (!token) {
    return res.status(401).json({ error: 'Token is not provided' })
  }

  if(token !== env.SECRET_TOKEN){
    return res.status(401).json({ erro: 'Unauthorized' })
  }
  return next()
}
