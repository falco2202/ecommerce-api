'use strict'

import keyTokenModelModel from '../models/keyTokenModel.model.js'

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      // const publicKeyString = publicKey.toString()
      // const tokens = await keyTokenModelModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // })
      // return tokens ? publicKeyString : null
      const filter = { user: userId },
        update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
        option = { upset: true, new: true }
      const tokens = keyTokenModelModel.findOneAndUpdate(filter, update, option)
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}

export default KeyTokenService
