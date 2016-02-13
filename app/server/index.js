'use strict'

const pkg = require('../../package.json')
const debug = require('debug')(pkg.name)

function run () {
  require('./create')(function (url) {
    debug(`running at ${url} 🐀`)
  })
}

if (process.env.NODE_ENV === 'production') return run()
if (require("piping")({
  ignore: /node_modules|bower_components|fink.db|.git|.DS_Store/
})) run()
