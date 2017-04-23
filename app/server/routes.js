'use strict'

const {first, get, last} = require('lodash')
const numeral = require('numeral')
const isURI = require('fink-is-uri')

const {database, server} = require('config')
const {
  isRegister,
  incrementCounter,
  register
} = require('fink-level')(database)

const cors = require('cors')

const corsOptions = { origin: server.url }

const riot = require('riot')
const shorten = require('app/client/tag/shorten')

function getFirstValue (instance) {
  return JSON.parse(get(first(instance), 'value'))
}

function getURI (path) {
  return `${server.url}/${path}`
}

module.exports = function (app) {
  app.get('/', function (req, res) {
    return res.render('home', {
      content: riot.render(shorten)
    })
  })

  app.get('/faq', function (req, res) {
    return res.render('faq')
  })

  app.get('/:hash', function (req, res) {
    let hash = req.params.hash

    function redirect () {
      isRegister(hash, function (err, isRegister, instance) {
        if (err) return res.error(err)

        if (isRegister) {
          instance = getFirstValue(instance)
          incrementCounter(instance)
          return res.redirect(301, instance.uri)
        }

        return res.fail(404)
      })
    }

    function info () {
      hash = hash.substring(0, hash.length - 1)
      isRegister(hash, function (err, isRegister, instance) {
        if (err) return res.error(err)
        if (!isRegister) return res.fail(404)
        instance = getFirstValue(instance)

        return res.render('stats', {
          hash: getURI(instance.hash),
          hashEmoji: getURI(instance.hashEmoji),
          hits: numeral(instance.hits).format('0,0'),
          isAbsolute: true
        })
      })
    }

    if (last(hash) === '+') return info()
    return redirect()
  })

  app.post('/', cors(corsOptions), function (req, res) {
    const uri = req.body.uri
    if (!uri) return res.fail(403, 'should to provide an URI to be shortened.')

    const hostname = req.hostname

    if (!isURI(uri, hostname)) {
      return res.fail(403, 'should to provide a valid URI to be shortened.')
    }

    isRegister(uri, function (err, isRegister, instance) {
      if (err) return res.error(err)

      if (isRegister) {
        instance = getFirstValue(instance)
        return res.success(202, instance)
      }

      register(uri, function (err, instance) {
        if (err) return res.error(err)
        return res.success(instance)
      })
    })
  })

  return app
}
