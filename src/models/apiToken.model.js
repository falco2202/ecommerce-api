'use strict'

import { model, Schema } from 'mongoose'
import {
  COLLECTION_NAME_API,
  DOCUMENT_NAME_API
} from '../constants/keyTokenConstant.js'

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: Boolean,
      default: true
    },
    permissions: {
      type: [String],
      required: true,
      enum: ['0000', '1111', '2222']
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME_API
  }
)

export default model(DOCUMENT_NAME_API, apiKeySchema)
