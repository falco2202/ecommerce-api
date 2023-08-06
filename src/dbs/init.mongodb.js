'use strict'

import mongoose from 'mongoose'
import 'dotenv/config'

class Database {
  constructor() {
    this.connect()
  }

  connect() {
    mongoose.set('debug', true)

    mongoose
      .connect(process.env.MONGO_URL, { maxPoolSize: 50 })
      .then(() => console.log('Connect MongoDB successful!'))
      .catch((err) => console.log(err))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongo = Database.getInstance()

export default instanceMongo
