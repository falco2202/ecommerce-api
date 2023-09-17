'use strict'

import { HEADER } from '../constants/headerValue.js'
import { findById } from '../services/apiKey.service.js'

export const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden error!'
      })
    }
    const objKey = await findById(key)
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden error!'
      })
    }

    req.objKey = objKey
    return next()
  } catch (error) {}
}

export const checkPermissions = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'Permission denied!'
      })
    }
    console.log(`Permission::${req.objKey.permissions}`)

    const validPermission = req.objKey.permissions.includes(permission)

    if (!validPermission) {
      return res.status(403).json({
        message: 'Permission denied!'
      })
    }
    return next()
  }
}
