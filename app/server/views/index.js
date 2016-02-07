'use strict'

const path = require('path')
const hbs = require('express-hbs')

module.exports = function (app, express) {
  hbs.registerHelper('asset', require('./helpers/asset'))

  app.engine('hbs', hbs.express4({
    partialsDir: path.resolve('app/client/views/partials'),
    layoutsDir: path.resolve('app/client/views/layouts'),
    beautify: app.locals.isProduction
  }))

  app.set('view engine', 'hbs')
  app.set('views', path.resolve('app/client/views'))

  app.use(express.static(path.resolve('app/public')))

  return app
}
