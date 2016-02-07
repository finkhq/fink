'use strict'

;(function (Fink, isValid) {
  Fink.foo = 'bar'
  Fink.isValidURI = function (uri) {
    return isValid(window.location.hostname, uri)
  }
})(window.Fink, require('fink-is-valid-uri'))
