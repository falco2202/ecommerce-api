'use strict'

import keyTokenModelModel from '../models/keyTokenModel.model.js'

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const publicKeyString = publicKey.toString()
      const tokens = await keyTokenModelModel.create({
        user: userId,
        publicKey,
        privateKey
      })
      return tokens ? publicKeyString : null
    } catch (error) {
      return error
    }
  }
}

export default KeyTokenService
