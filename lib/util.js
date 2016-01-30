'use strict'

const path = require('path')

module.exports = {
  dirPath: function () {
    const args = Array.prototype.slice.call(arguments)
    args.unshift(process.cwd())
    return path.join.apply(null, args)
  }
}
