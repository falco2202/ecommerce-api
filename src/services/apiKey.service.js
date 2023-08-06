'use strict'

import apiTokenModel from '../models/apiToken.model.js'
// import crypto from 'crypto'

export const findById = async (key) => {
  // const newKey = await apiTokenModel.create({
  //   key: crypto.randomBytes(64).toString('hex'),
  //   permissions: ['0000']
  // })
  const objKey = await apiTokenModel.findOne({ key, status: true }).lean()
  return objKey
}

