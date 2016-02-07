'use strict'

const riot = require('riot')
const shorten = require('app/client/tag/shorten')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('home', {
      title: 'URL Shortener for Masses',
      content: riot.render(shorten)
    })
  })

  return app
}
