'use strict'

# -- Dependencies --------------------------------------------------------------

config      = require 'config'
gulp        = require 'gulp'
gutil       = require 'gulp-util'
riot        = require 'gulp-riot'
sass        = require 'gulp-sass'
concat      = require 'gulp-concat'
coffee      = require 'gulp-coffee'
header      = require 'gulp-header'
uglify      = require 'gulp-uglify'
cssmin      = require 'gulp-cssmin'
addsrc      = require 'gulp-add-src'
changed     = require 'gulp-changed'
shorthand   = require 'gulp-shorthand'
pkg         = require './package.json'
prefix      = require 'gulp-autoprefixer'
strip       = require 'gulp-strip-css-comments'
browserSync = require 'browser-sync'
reload      = browserSync.reload

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
    vendor : ['node_modules/fink-is-valid-uri/dist/fink-is-valid-uri.js'
              'bower_components/es6-promise/promise.min.js'
              'bower_components/fetch/fetch.js']
  css      :
    main   : 'assets/css/' + dist.name + '.css'
    vendor : ['bower_components/milligram/dist/milligram.min.css']

banner = [ "/**"
           " * <%= pkg.name %> - <%= pkg.description %>"
           " * @version <%= pkg.version %>"
           " * @link    <%= pkg.homepage %>"
           " * @author  <%= pkg.author.name %> (<%= pkg.author.url %>)"
           " * @license <%= pkg.license %>"
           " */"
           "" ].join("\n")

# -- Tasks ---------------------------------------------------------------------

gulp.task 'css', ->
  gulp.src src.css.vendor
  .pipe changed dist.css
  .pipe addsrc src.sass.main
  .pipe sass().on 'error', gutil.log
  .pipe concat '' + dist.name + '.css'
  .pipe prefix()
  .pipe strip all: true
  .pipe shorthand()
  .pipe cssmin()
  .pipe header banner, pkg: pkg
  .pipe gulp.dest dist.css
  return

gulp.task 'js', ->
  gulp.src src.js.vendor
  .pipe addsrc src.js.main
  .pipe addsrc src.js.tag
  .pipe riot({
    compact: true
  }).on 'error', gutil.log
  .pipe concat '' + dist.name + '.js'
  .pipe uglify()
  .pipe header banner, pkg: pkg
  .pipe gulp.dest dist.js
  return

gulp.task 'server', ->
  browserSync.init null,
    proxy: "http://127.0.0.1:#{config.server.port}"
    files: ['app/public/assets/**/*.*']
    port: config.serverDev.port
    reloadDelay: 1500
  return

gulp.task 'build', ['css', 'js']

gulp.task 'default', ->
  gulp.start ['build', 'server']
  gulp.watch src.sass.files, ['css']
  gulp.watch [src.js.main, src.js.tag], ['js']
  gulp.watch([src.views, src.js.tag]).on('change', reload)
