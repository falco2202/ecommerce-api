'use strict'

import bcrypt from 'bcrypt'
import shopModel from '../models/shop.model.js'
import { ROLES } from '../constants/shopConstant.js'
import KeyTokenService from './keyToken.service.js'
import { createTokenPair } from '../auth/authUtil.js'
import { generationTokens, getInfoData } from '../utils/index.js'
import { AuthFailureError, BadRequestError } from '../core/error.response.js'
import { findByEmail } from './shop.service.js'

class AuthService {
  static logout = async (keyStore) => {
    return await KeyTokenService.removeKeyById(keyStore._id)
  }

  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email })
    if (!foundShop) {
      throw new BadRequestError('Shop not registered!')
    }

    const matchPassword = bcrypt.compare(password, foundShop.password)
    if (!matchPassword) {
      throw new AuthFailureError('Authentication error!')
    }

    const { privateKey, publicKey } = generationTokens()

    const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey)

    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      publicKey,
      privateKey
    })

    return {
      shop: getInfoData({
        field: ['_id', 'name', 'email'],
        object: foundShop
      }),
      tokens
    }
  }

  static signUp = async ({ name, email, password }) => {
    const isExistShop = await shopModel.findOne({ email }).lean()

    if (isExistShop) {
      throw new BadRequestError('Error: Shop already register!')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [ROLES.SHOP]
    })

    if (newShop) {
      const { privateKey, publicKey } = generationTokens()

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey
      })

      if (!keyStore) {
        return { code: 'xxxx', message: 'Key store error!' }
      }

      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

      return {
        shop: getInfoData({
          field: ['_id', 'name', 'email'],
          object: newShop
        }),
        tokens
      }
    }
    return {
      code: 200,
      metadata: null
    }
  }
}

export default AuthService
