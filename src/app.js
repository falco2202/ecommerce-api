import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import 'dotenv/config'
import instanceMongo from './dbs/init.mongodb.js'
import { countConnect, checkOverload } from './helpers/check.connect.js'
import route from './routes/index.js'

const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init database
instanceMongo

// check log
countConnect()
// checkOverload()

// init routes
app.use('/', route)

// handling error

export default app
