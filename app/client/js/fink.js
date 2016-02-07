'use strict'

;(function (Fink, fetch, isURI) {
  Fink.isURI = function (uri) {
    return isURI(window.location.hostname, uri)
  }

  Fink.register = function (uri) {
    console.log("'here")
    console.log(fetch)
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
})(window.Fink, window.fetch, require('fink-is-valid-uri')); // eslint-disable-line
