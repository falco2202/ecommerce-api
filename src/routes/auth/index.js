'use strict'

import express from 'express'
import authController from '../../controllers/auth.controller.js'
import { asyncHandle } from '../../auth/checkAuth.js'

const router = express.Router()

router.post('/shop/signup', asyncHandle(authController.signUp))

export default router
