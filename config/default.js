module.exports = {
  server: {
    url: 'http://127.0.0.1:3000',
    host: '127.0.0.1',
    port: 3000,
    portDev: 4000
  },

  database: {
    connector: require('level'),
    path: './fink.db',
    counter: '__id'
  }
}
