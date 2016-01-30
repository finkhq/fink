'use strict'

const debug = require('debug')('server')

require('./create')(function (url) {
  debug(`running at ${url} 🐀`)
})
