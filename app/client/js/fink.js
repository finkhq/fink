'use strict'

;(function (Fink, isValid, fetch) {
  Fink.foo = 'bar'
  Fink.isValidURI = function (uri) {
    return isValid(window.location.hostname, uri)
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
})(window.Fink, require('fink-is-valid-uri'), window.fetch)
