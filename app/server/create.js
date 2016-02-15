'use strict'

const config = require('config').server
const pkg = require('../../package.json')

const express = require('express')
const app = express()

// middlewares
const morgan = require('morgan')
const compress = require('compression')
const helmet = require('helmet')
const jsendp = require('jsendp')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')

app.use(favicon(process.cwd() + '/app/public/assets/images/favicon/favicon.ico'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
app.use(compress())
app.use(morgan('combined'))
app.use(jsendp())

module.exports = function (cb) {
  const isProduction = process.env.NODE_ENV === 'production'

  require('./views')(app, express)
  require('./routes')(app)

  app.locals.isProduction = isProduction
  app.locals.FINK_VERSION = pkg.version

  app.disable('x-powered-by')

  app.listen(config.port, function () {
    return cb(config.url)
  })
}
