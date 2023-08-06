'use strict'

import jwt from 'jsonwebtoken'
import { asyncHandle } from '../helpers/asyncHandler.js'
import { HEADER } from '../constants/headerValue.js'
import { AuthFailureError } from '../core/error.response.js'
import { findByUserId } from '../services/keyToken.service.js'

export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: '2 days'
    })
    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: '7 days'
    })

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`Error verify::${err}`)
      } else {
        console.log(`Decode verify::${decode}`)
      }
    })
    return { accessToken, refreshToken }
  } catch (error) {
    return error
  }
}

export const authentication = asyncHandle(async (req, res, next) => {
  /**
   * 1. Check userId missing
   * 2. Get access token
   * 3. verify token
   * 4. Check user in DB
   */

  const userId = req.header[HEADER.CLIENT_ID]

  if (!userId) {
    throw new AuthFailureError('Invalid request!')
  }

  const keyStore = await findByUserId(userId)
  if (!keyStore) {
  }
})
