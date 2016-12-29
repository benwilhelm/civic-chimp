var gulp = require('gulp');
var clean = require("gulp-clean");
var pug  = require('gulp-pug');
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sequence = require("run-sequence");

var browserify = require("browserify");
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');

const client = './client'
const publicDir = "./public"

gulp.task('clean', function cleanPublic(){
  return gulp.src(`${publicDir}/*`, { read: false }).pipe(clean());
})

gulp.task('html', function buildHtml(){
  return gulp.src(`${client}/*.pug`)
             .pipe(pug({
               pretty: true
             }))
             .pipe(gulp.dest(publicDir))
  
})

gulp.task('copyThemeCss', function copyThemeCss(){
  return gulp.src([
    `${client}/css/bootstrap.min.css`,
    `${client}/css/half-slider.css`
  ])
  .pipe(gulp.dest(`${publicDir}/css`))
})

gulp.task('copyThemeJs', function copyThemeJs(){
  return gulp.src([
    `${client}/js/lib/bootstrap.min.js`,
    `${client}/js/lib/jquery.js`
  ])
  .pipe(gulp.dest(`${publicDir}/js`))
})





gulp.task('copyThemeResources', [ 'copyThemeCss', 'copyThemeJs' ], function(){
  return gulp.src([
    `${client}/*.png`
  ])
  .pipe(gulp.dest(publicDir));
})

gulp.task('sass', function buildSass(){
  return gulp.src(
    `${client}/sass/**/*.scss`
  )
  .pipe(sass())
  .pipe(gulp.dest(`${publicDir}/css`))
  
})

gulp.task('buildSignupWidget', function(){
  var widget = browserify({
    entries: `${client}/js/signup-widget/main.js`,
    transform: [[babelify, {presets: ['es2015', 'react']}]]
  })
  
  widget.bundle()
  .pipe(source('widget.js'))
  .pipe(gulp.dest(`${publicDir}/js`))
})

gulp.task('uglifyWidget', [ 'buildSignupWidget' ], function(){
  gulp.src(`${publicDir}/js/widget.js`)
  .pipe(uglify())
  .pipe(rename('widget.min.js'))
  .pipe(gulp.dest(`${publicDir}/js`))
})


gulp.task('build', function(done){
  sequence('clean', [
    'copyThemeResources',
    'html'
  ], 'buildSignupWidget')
})

gulp.task('watchWidget', function(){
  livereload.listen();
  gulp.watch('client/js/signup-widget/**/*', ['buildSignupWidget'])
})
