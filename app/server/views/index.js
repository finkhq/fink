'use strict'

const hbs = require('express-hbs')
const dirPath = require('../../lib/util').dirPath

module.exports = function (app, express) {
  hbs.registerHelper('asset', require('./helpers/asset'))

  app.engine('hbs', hbs.express4({
    partialsDir: dirPath('app/client/views/partials'),
    layoutsDir: dirPath('app/client/views/layouts'),
    beautify: process.env.NODE_ENV !== 'production'
  }))

  app.set('view engine', 'hbs')
  app.set('views', dirPath('app/client/views'))

  app.use(express.static(dirPath('app/public')))

  return app
}
