class RouterAdapter {
  static adapt(fn) {
    return async (req, res) => {
      const event = {
        body: req.body
      }
    
      const eventResponse = await fn(event)
      res.status(eventResponse.statusCode).json(eventResponse.body)
    }
  }
}

module.exports = RouterAdapter
