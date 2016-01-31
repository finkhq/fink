'use strict'

const path = require('path')

module.exports = {
  dirPath: function () {
    return path.resolve.apply(null, arguments)
  }
}
