module.exports = {
  server: {
    protocol: 'http',
    host: 'localhost',
    port: 3000,
    portDev: 4000
  },

  database: {
    connector: require('level-mem'),
    path: './fink.db',
    counter: '__id'
  }
}
