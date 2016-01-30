'use strict'

const debug = require('debug')('server')
const config = require('config')

require('./create').listen(config.port, function () {
  debug(`Server running at http://localhost:${config.port} 🐀`)
})
