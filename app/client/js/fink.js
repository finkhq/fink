'use strict'

;(function (Fink, fetch, _isURI, parseURI) {
  Fink.isURI = function (uri) {
    uri = parseURI(uri)
    return (uri.hostname !== window.location.hostname) && _isURI(uri, {strictMode: true})
  }

  Fink.register = function (uri) {
    return fetch(Fink.endpoint, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uri: uri
      })
    }).then(function (response) {
      return response.json()
    })
  }

  Fink.buzz = function () {
    var elem = document.getElementById('fink-logo')
    elem.classList.add('toggleBuzz')
    setTimeout(function () {
      elem.classList.remove('toggleBuzz')
    }, 750)
  }
})(window.Fink, window.fetch, require('isURI'), require('parse-uri')); // eslint-disable-line
