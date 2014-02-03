// Vars
var EXPRESS_PORT    = 4000,
    EXPRESS_ROOT    = __dirname + '/dist',
    LIVERELOAD_PORT = 35729;

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

/*************
* Functions
**************/
// Express Server
function startExpress() {
  var express = require('express'),
      app     = express();

  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
  console.log('App server listening at http://localhost:' + EXPRESS_PORT + '/');
}
// Live Reload Server
function startLiveReload() {
  server.listen(LIVERELOAD_PORT, function (error){
    if (error) {
      return console.log(error);
    };
  });
}

/*************
* Tasks
**************/
// Styles
gulp.task('styles', function(){
  return gulp.src('app/styles/main.less')
    .pipe(less())
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function(){
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Script task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Images task complete' }));
});

// HTML
gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Deployed HTML' }))
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function(){
  gulp.start('styles', 'scripts', 'images', 'html');
});

gulp.task('dev', function(){
  startExpress();
  startLiveReload();

  gulp.watch('app/scripts/**/*.js', ['scripts']);

  gulp.watch('app/styles/**/*.less', ['styles']);

  gulp.watch('app/images/**/*', ['images']);

  gulp.watch('app/**/*.html', ['html']);
});
