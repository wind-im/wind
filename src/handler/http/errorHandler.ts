import * as Boom from '@hapi/boom'

const loginErrorCode = 403
const loginErrorMsg = 'Please login first.'

export function errorHandler (err, req, res, next) {
  console.error("#errorHandler, e=", err)
  if (Boom.isBoom(err)) {
    // boom login error
    if (err.output.payload.statusCode == loginErrorCode) {
      res.status(loginErrorCode)
      res.json({
        error: loginErrorCode,
        message: loginErrorMsg
      })
    } else {
      // other boom error
      res.status(err.output.payload.statusCode)
      res.json({
        error: err.output.payload.error,
        message: err.output.payload.message
      })
    }
  } else {
    // not boom error
    res.status(500)
    res.json({
      error: err,
      message: 'Unexpected error'
    })
  }
}
