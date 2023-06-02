'use strict'

import express from 'express'
import authRoute from './auth/index.js'

const router = express.Router()

router.use('/v1/api', authRoute)

export default router
