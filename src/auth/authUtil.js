'use strict'

import jwt from 'jsonwebtoken'
import { asyncHandle } from '../helpers/asyncHandler.js'
import { HEADER } from '../constants/headerValue.js'
import { AuthFailureError } from '../core/error.response.js'
import KeyTokenService from '../services/keyToken.service.js'

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
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) {
    throw new AuthFailureError('Invalid request!')
  }

  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) {
    throw new NotFoundError('Not found key store!')
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) {
    throw new AuthFailureError('Invalid request!')
  }

  try {
    const decodeUser = await jwt.verify(accessToken, keyStore.publicKey)
    if (userId !== decodeUser.userId) {
      throw new AuthFailureError('Invalid User!')
    }

    req.keyStore = keyStore
    return next()
  } catch (error) {
    throw error
  }
})
