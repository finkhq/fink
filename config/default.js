module.exports = {
  server: {
    url: process.env.APP_URL || 'http://0.0.0.0:3000',
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    portDev: 4000
  },

  database: {
    connector: require('level'),
    path: './fink.db',
    counter: '__id'
  }
}
