'use strict'

# -- Dependencies --------------------------------------------------------------

gulp        = require 'gulp'
gulpif      = require 'gulp-if'
riot        = require 'gulp-riot'
sass        = require 'gulp-sass'
concat      = require 'gulp-concat'
uglify      = require 'gulp-uglify'
cssmin      = require 'gulp-cssmin'
addsrc      = require 'gulp-add-src'
changed     = require 'gulp-changed'
cssnano     = require 'gulp-cssnano'
prefix      = require 'gulp-autoprefixer'
strip       = require 'gulp-strip-css-comments'
browserSync = require 'browser-sync'
reload      = browserSync.reload

isProduction = process.env.NODE_ENV is 'production'

config = require './config'
pkg    = require './package.json'

# -- Files ---------------------------------------------------------------------

pkg.name = 'fink'

dist =
  name     : pkg.name
  css      : 'app/public/assets/css'
  js       : 'app/public/assets/js'

src =
  views    : 'app/client/views/**/*.hbs'
  sass:
    main   : 'app/client/scss/' + dist.name + '.scss'
    files  : ['app/client/scss/**/**']
  js       :
    main   : 'app/client/js/fink.js'
    tag    : 'app/client/tag/**/**'
    vendor : ['node_modules/fink-is-uri/dist/fink-is-uri.js']

  css      :
    main   : 'assets/css/' + dist.name + '.css'
    vendor : []

# -- Tasks ---------------------------------------------------------------------

gulp.task 'css', ->
  gulp.src src.css.vendor
  .pipe changed dist.css
  .pipe addsrc src.sass.main
  .pipe sass().on 'error', sass.logError
  .pipe concat '' + dist.name + '.css'
  .pipe gulpif(isProduction, prefix())
  .pipe gulpif(isProduction, strip all: true)
  .pipe gulpif(isProduction, cssnano())
  .pipe gulp.dest dist.css
  return

gulp.task 'js', ->
  gulp.src src.js.vendor
  .pipe addsrc src.js.tag
  .pipe addsrc src.js.main
  .pipe riot compact: true
  .pipe concat '' + dist.name + '.js'
  .pipe gulpif(isProduction, uglify())
  .pipe gulp.dest dist.js
  return

gulp.task 'server', ->
  browserSync.init null,
    proxy: "http://127.0.0.1:#{config.server.port}"
    files: ['app/public/assets/**/*.*']
    port: config.server.portDev
    reloadDelay: 1000
  return

gulp.task 'build', ['css', 'js']

gulp.task 'default', ->
  gulp.start ['build', 'server']
  gulp.watch src.sass.files, ['css']
  gulp.watch [src.js.main, src.js.tag], ['js']
  gulp.watch([src.views, src.js.tag]).on('change', reload)
