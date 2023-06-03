'use strict'

import reasonPhrases from '../utils/reasonPhrases.js'
import statusCode from '../utils/statusCode.js'

class SuccessResponse {
  constructor({
    message,
    status = statusCode.OK,
    reasonStatusCode = reasonPhrases.OK,
    metadata = {}
  }) {
    this.message = message || reasonStatusCode
    this.status = status
    this.metadata = metadata
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this)
  }
}

class OKResponse extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata })
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({
    message,
    status = statusCode.CREATED,
    reasonStatusCode = reasonPhrases.CREATED,
    metadata
  }) {
    super({ message, status, reasonStatusCode, metadata })
  }
}

export { OKResponse, CreatedResponse }
