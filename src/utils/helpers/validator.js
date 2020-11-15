class Validator {
  validate(shape, data) {
    const schema = {
      isValid: true, 
      err: [] 
    }

    shape.map((field) => {
      if(!data[field.name] && field.required) {
        schema['err'].push(`${field.name} is required`)
        schema['isValid'] = false
      }
    })

    console.log(schema)
    
    return schema
  }
}

module.exports = Validator
