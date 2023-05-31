import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import instanceMongo from './dbs/init.mongodb.js'
import { countConnect, checkOverload } from './helpers/check.connect.js'
import 'dotenv/config'

const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init database
instanceMongo

// check log
countConnect()
checkOverload()

// init routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'oke'
  })
})

// handling error

export default app
