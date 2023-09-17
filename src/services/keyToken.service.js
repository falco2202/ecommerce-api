'use strict'

import keyTokenModel from '../models/keyToken.model.js'
import mongoose from 'mongoose'
class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const publicKeyString = publicKey.toString()
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey
      })
      return tokens ? publicKeyString : null
    } catch (error) {
      return error
    }
  }

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: new mongoose.Types.ObjectId(userId) }).lean()
  }

  static removeKeyById = async (id) => {
    return await keyTokenModel.remove(id)
  }
}

export default KeyTokenService
