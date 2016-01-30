'use strict'

module.exports = function (app) {
  app.get('/:name', function (req, res) {
    res.render('index', {
      name: 'Kiko Beats'
    })
  })

  return app
}
