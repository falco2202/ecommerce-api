'use strict'

import express from 'express'
import authController from '../../controllers/auth.controller.js'
import { asyncHandle } from '../../auth/checkAuth.js'

const router = express.Router()

router.post('/shop/signup', asyncHandle(authController.signUp))
router.post('/shop/login', asyncHandle(authController.login))

// Authentication

// router.post('/shop/logout', asyncHandle(authController.logout))

export default router
