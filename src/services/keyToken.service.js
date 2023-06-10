'use strict'

import keyTokenModel from '../models/keyToken.model.js'

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
      // const filter = { user: userId },
      //   update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
      //   option = { upset: true, new: true }

      // const tokens = await keyTokenModel.findOneAndUpdate(filter, update, option)

      // return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}

export default KeyTokenService
