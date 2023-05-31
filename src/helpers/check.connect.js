'use strict'

import mongoose from 'mongoose'
import os from 'os'
import process from 'process'
import { TIME_CHECK_LOG } from '../constants/defaultValue.js'

export const countConnect = () => {
  console.log(`Number of connection::${mongoose.connections.length}`)
}

// check overload
export const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    const maxConnect = numCores * 5

    console.log(`Active connection::${numConnection}`)
    console.log(`Memory usage::${memoryUsage / 1024 / 1024} MB`)

    if (numCores > maxConnect) {
      console.log(`Connection overload detected!`)
    }
  }, TIME_CHECK_LOG)
}
