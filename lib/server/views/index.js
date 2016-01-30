'use strict'

const hbs = require('express-hbs')
const dirPath = require('../../util').dirPath

module.exports = function (app, express) {
  hbs.registerHelper('asset', require('./helpers/asset'))

  app.engine('hbs', hbs.express4({
    partialsDir: dirPath('views/partials'),
    layoutsDir: dirPath('views/layouts'),
    beautify: process.env.NODE_ENV !== 'production'
  }))

  app.set('view engine', 'hbs')
  app.set('views', dirPath('views'))

  app.use(express.static(dirPath('public')))

  return app
}
