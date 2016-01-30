'use strict'

const express = require('express')
const app = express()

const helmet = require('helmet')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const compress = require('compression')
const morgan = require('morgan')

const isProduction = process.env.NODE_ENV === 'production'

app.use(compress())
if (isProduction) app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
// app.use(favicon(__dirname + '/public/favicon.ico'))

app.locals.isProduction = isProduction

app.disable('x-powered-by')

require('./views')(app, express)
require('./routes')(app)

module.exports = app
