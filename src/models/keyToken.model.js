'use strict'

import { model, Schema } from 'mongoose'
import {
  COLLECTION_NAME,
  DOCUMENT_NAME
} from '../constants/keyTokenConstant.js'

const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Shop'
    },
    publicKey: {
      type: String,
      required: true
    },
    privateKey: {
      type: String,
      required: true
    }
  },
  {
    collation: COLLECTION_NAME,
    timestamps: true
  }
)

export default model(DOCUMENT_NAME, keyTokenSchema)
