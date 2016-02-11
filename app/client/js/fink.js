'use strict'

;(function (Fink, fetch, _isURI) {
  Fink.isURI = function (uri) {
    return _isURI(uri, window.location.hostname)
  }

  Fink.path = function (relative) {
    return window.location.href + relative
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
})(window.Fink, window.fetch, require('fink-is-uri')); // eslint-disable-line
