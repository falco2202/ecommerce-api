'use strict'

import express from 'express'
import authRoute from './auth/index.js'
// import { apiKey, checkPermissions } from '../auth/checkAuth.js'

const router = express.Router()

// check api key
// router.use(apiKey)

// check permission
// router.use(checkPermissions('0000'))

router.use('/v1/api', authRoute)

export default router
