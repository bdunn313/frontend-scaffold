var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
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

gulp.task('styles', function(){
  return gulp.src('app/styles/main.less')
});

gulp.task('default', function(){
  // The Default Task
});
