import { ValidationError } from 'yup'

interface Errors{
  [key:string]:string
}

export default function getValidationErrors(err:ValidationError):Errors{
  const validationErrors:Errors = {}

  err.inner.forEach( error => {
    const { path, message } = error
    validationErrors[path as string] = message
  })
  return validationErrors
}
