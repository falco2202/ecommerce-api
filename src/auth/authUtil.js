'use strict'

import jwt from 'jsonwebtoken'

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
