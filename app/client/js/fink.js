'use strict'

;(function (Fink, superagent) {
  Fink.isURI = function (uri) {
    return require('fink-is-uri')(uri, Fink.host)
  }

  Fink.route = function (relative) {
    return Fink.endpoint + '/' + relative
  }

  Fink.register = function (uri, cb) {
    return window.superagent.post(Fink.endpoint)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ uri: uri })
      .end(function (err, res) {
        return cb(res.body.data)
      })
  }

  Fink.buzz = function () {
    var elem = document.getElementById('fink-logo')
    elem.classList.add('toggleBuzz')
    setTimeout(function () {
      elem.classList.remove('toggleBuzz')
    }, 750)
  }
})(window.Fink); // eslint-disable-line
