// Gulp and Plugins
var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    jshint        = require('gulp-jshint'),
    less          = require('gulp-less'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    rename        = require('gulp-rename'),
    clean         = require('gulp-clean'),
    concat        = require('gulp-concat'),
    notify        = require('gulp-notify'),
    cache         = require('gulp-cache'),
    livereload    = require('gulp-livereload'),
    lr            = require('tiny-lr'),
    server        = lr();

// Styles
gulp.task('styles', function(){
  return gulp.src('app/styles/main.less')
    .pipe(less())
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.tasl('scripts', function(){
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(contact('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('default', function(){
  // The Default Task
});
