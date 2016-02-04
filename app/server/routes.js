'use strict'

const riot = require('riot')
const search = require('app/client/tag/search')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('home', {
      title: 'URL Shortener for Masses',
      content: riot.render(search)
    })
  })

  return app
}
