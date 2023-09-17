'use strict'

import express from 'express'
import authController from '../../controllers/auth.controller.js'
import { asyncHandle } from '../../helpers/asyncHandler.js'
import { authentication } from '../../auth/authUtil.js'

const router = express.Router()

router.post('/shop/signup', asyncHandle(authController.signUp))
router.post('/shop/login', asyncHandle(authController.login))

// authentication
router.use(authentication)
router.post('/shop/logout', asyncHandle(authController.logout))

export default router
