'use strict'

const riot = require('riot')
const lodash = require('lodash')

const config = require('config').database
config.connector = require(config.connector)

const URI = require('fink-level')(config)
const isURI = require('fink-is-uri')
const shorten = require('app/client/tag/shorten')

function getValue (instance) {
  return JSON.parse(lodash.get(lodash.first(instance), 'value'))
}

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('home', {
      title: 'URL Shortener for Masses',
      content: riot.render(shorten)
    })
  })

  app.get('/:hash', function (req, res) {
    let hash = req.params.hash

    function redirect () {
      URI.isRegister(hash, function (err, isRegister, instance) {
        if (err) return res.error(err)

        if (isRegister) {
          instance = getValue(instance)
          URI.incrementCounter(instance)
          return res.redirect(301, instance.uri)
        }

        return res.fail(404)
      })
    }

    function info () {
      hash = hash.substring(0, hash.length - 1)
      URI.isRegister(hash, function (err, isRegister, instance) {
        if (err) return res.error(err)
        if (!isRegister) return res.fail(404)
        instance = getValue(instance)
        res.success(instance)
      })
    }

    if (lodash.last(hash) === '+') return info()
    return redirect()
  })

  app.post('/', function (req, res) {
    const uri = req.body.uri
    if (!uri) return res.fail(403, 'should to provide an URI to be shortened.')

    const hostname = req.hostname

    if (!isURI(uri, hostname))
      return res.fail(403, 'should to provide a valid URI to be shortened.')

    URI.isRegister(uri, function (err, isRegister, instance) {
      if (err) return res.error(err)

      if (isRegister) {
        instance = getValue(instance)
        return res.success(202, instance)
      }

      URI.register(uri, function (err, instance) {
        if (err) return res.error(err)
        return res.success(instance)
      })
    })
  })

  return app
}
