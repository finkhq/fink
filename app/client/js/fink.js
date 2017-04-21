'use strict'

;(function (Fink, fetch) {
  Fink.isURI = function (uri) {
    return require('fink-is-uri')(uri, Fink.host)
  }

  Fink.route = function (relative) {
    return Fink.endpoint + '/' + relative
  }

  Fink.register = function (uri, cb) {
    return fetch(Fink.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uri: uri })
    })
  }

  Fink.logo = document.querySelectorAll('.fink-logo')[0]

  Fink.buzz = function () {
    Fink.logo.classList.add('toggleBuzz')
    setTimeout(function () {
      Fink.logo.classList.remove('toggleBuzz')
    }, 750)
  }
})(window.Fink, window.fetch)
