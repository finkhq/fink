'use strict'

const hbs = require('express-hbs')
const dirPath = require('../../util').dirPath

module.exports = function (app, express) {
  app.engine('hbs', hbs.express4({
    partialsDir: dirPath('views/partials'),
    layoutsDir: dirPath('views/layouts'),
    beautify: process.env.NODE_ENV !== 'production'
  }))

  require('./helpers')

  app.set('view engine', 'hbs')
  app.set('views', dirPath('views'))

  app.use(express.static(dirPath('public')))

  return app
}
