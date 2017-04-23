'use strict'

const pkg = require('../../package.json')
const debug = require('debug')(pkg.name)

function run () {
  require('./create')(function (url) {
    debug(`running at ${url} 🐀`)
  })
}

run()
