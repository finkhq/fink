'use strict'

# -- Dependencies --------------------------------------------------------------

config      = require 'config'
gulp        = require 'gulp'
gutil       = require 'gulp-util'
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
  css      : 'public/assets/css'
  js       : 'public/assets/js'

src =
  sass:
    main   : 'public/assets/scss/' + dist.name + '.scss'
    files  : ['public/assets/scss/**/**']
  js       :
    main   : []
    vendor : []
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
  gulp.src src.js.main
  .pipe changed dist.js
  .pipe coffee().on 'error', gutil.log
  .pipe addsrc src.js.vendor
  .pipe concat '' + dist.name + '.js'
  .pipe uglify()
  .pipe header banner, pkg: pkg
  .pipe gulp.dest dist.js
  return

gulp.task 'server', ->
  browserSync.init null,
    proxy: "http://127.0.0.1:#{config.port}"
    files: ['public/assets/**/*.*']
    reloadDelay: 300
    port: config.browserSync
  return

gulp.task 'build', ['css', 'js']

gulp.task 'default', ->
  gulp.start ['build', 'server']
  gulp.watch src.sass.files, ['css']
  gulp.watch src.js.main, ['js']
  gulp.watch src.js.vendor, ['js']
