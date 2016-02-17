const path = require('path')

module.exports = {
  server: {
    url: process.env.APP_URL || 'http://0.0.0.0:3000',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    portDev: 4000
  },

  client: {
    GA_ID: process.env.GA_ID
  },

  database: {
    connector: require('level'),
    path: process.env.STORAGE_DIR || path.resolve('storage'),
    counter: '__id'
  }
}
