'use strict'

import AuthService from '../services/auth.service.js'
import { OKResponse, CreatedResponse } from '../core/success.response.js'

class AuthController {
  signUp = async (req, res, next) => {
    new CreatedResponse({
      message: 'Register successful!',
      metadata: await AuthService.signUp(req.body)
    }).send(res)
  }
}

export default new AuthController()
