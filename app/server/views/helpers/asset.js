'use strict'

var hbs = require('express-hbs')

module.exports = function asset (context, option) {
  hbs.registerHelper('asset', function (relativePath) {
    return new hbs.SafeString(`assets/${relativePath}`)
  })
}
