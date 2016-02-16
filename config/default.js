const path = require('path')

module.exports = {
  server: {
    url: process.env.APP_URL || 'http://0.0.0.0:3000',
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    portDev: 4000
  },

  database: {
    connector: require('level'),
    path: process.env.STORAGE_DIR || path.join(__dirname, 'storage'),
    counter: '__id'
  }
}
