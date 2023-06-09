'use strict'

import _ from 'lodash'
import crypto from 'crypto'

export const getInfoData = ({ field = [], object = {} }) => {
  return _.pick(object, field)
}

export const generationTokens = () => {
  const privateKey = crypto.randomBytes(64).toString('hex')
  const publicKey = crypto.randomBytes(64).toString('hex')
  return { privateKey, publicKey }
}
