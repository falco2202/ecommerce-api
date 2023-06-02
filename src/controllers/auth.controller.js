'use strict'

import AuthService from '../services/auth.service.js'

class AuthController {
  signUp = async (req, res, next) => {
    try {
      return res.status(201).json(await AuthService.signUp(req.body))
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
