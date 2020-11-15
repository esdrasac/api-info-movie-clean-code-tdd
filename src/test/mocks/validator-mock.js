exports.makeValidatorStub = () => {
  class ValidatorStub {
    validate(schema, eventBody) {
      const validation = {
        isValid: true,
        err: {}
      }

      for(const each of schema) {
        if(!eventBody[each.field]){
          validation.isValid = false
          validation.err[each.field] = 'Dados Inválidos' 
        }
      }

      return validation
    }
  }

  return new ValidatorStub()
}
