'use strict'

import AuthService from '../services/auth.service.js'
import { OKResponse, CreatedResponse, SuccessResponse } from '../core/success.response.js'

class AuthController {
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AuthService.login(req.body)
    }).send(res)
  }

  signUp = async (req, res, next) => {
    new CreatedResponse({
      message: 'Register successful!',
      metadata: await AuthService.signUp(req.body)
    }).send(res)
  }

  logout = async (req, res, next) => {
    new OKResponse({
      message: 'Logout successful!',
      metadata: await AuthService.logout(req.keyStore)
    }).send(res)
  }
}

export default new AuthController()
