var gulp = require('gulp');
var clean = require("gulp-clean");
var pug  = require('gulp-pug');
var sass = require('gulp-sass');


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



gulp.task('copyThemeResources', [ 'copyThemeCss', 'copyThemeJs' ])

gulp.task('sass', function buildSass(){
  return gulp.src(
    `${client}/sass/**/*.scss`
  )
  .pipe(sass())
  .pipe(gulp.dest(`${publicDir}/css`))
  
})

gulp.task('buildClient', [
  'copyThemeResources',
  'sass',
  'html'
])
