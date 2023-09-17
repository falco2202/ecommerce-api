'use strict'

import mongoose, { Schema } from 'mongoose'
import { DOCUMENT_NAME, COLLECTION_NAME, SHOP_STATUS } from '../constants/shopConstant.js'

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: [SHOP_STATUS.ACTIVE, SHOP_STATUS.INACTIVE],
      default: SHOP_STATUS.INACTIVE
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export default mongoose.model(DOCUMENT_NAME, shopSchema)
