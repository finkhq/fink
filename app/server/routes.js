'use strict'

const riot = require('riot')
const timer = require('app/client/tag/timer')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('home', {
      title: 'LOL',
      name: 'Kiko Beats'
    })
  })

  app.get('/test', function (req, res) {
    res.render('test', {
      content: riot.render(timer)
    })
  })

  return app
}
