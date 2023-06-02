'use strict'

import bcrypt from 'bcrypt'
import shopModel from '../models/shop.model.js'
import { ROLES } from '../constants/shopConstant.js'
import crypto from 'crypto'
import KeyTokenService from './keyToken.service.js'
import { createTokenPair } from '../auth/authUtil.js'
import { getInfoData } from '../utils/index.js'

class AuthService {
  static signUp = async ({ name, email, password }) => {
    try {
      const isExistShop = await shopModel.findOne({ email }).lean()

      if (isExistShop) {
        return {
          code: 'xxxx',
          message: 'Shop already register!'
        }
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [ROLES.SHOP]
      })

      if (newShop) {
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem'
        //   },
        //   privatekeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem'
        //   }
        // })

        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey
        })

        if (!keyStore) {
          return { code: 'xxxx', message: 'Key store error!' }
        }

        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        )

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              field: ['_id', 'name', 'email'],
              object: newShop
            }),
            tokens
          }
        }
      }
      return {
        code: 200,
        metadata: null
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
}

export default AuthService
