// Constants
var EXPRESS_PORT    = 4000,
    EXPRESS_ROOT    = __dirname + '/dist',
    LIVERELOAD_PORT = 35729,
    BASE_SRC_DIR    = 'app/',
    JAVASCRIPTS_SRC = BASE_SRC_DIR + 'scripts',
    LESS_SRC        = BASE_SRC_DIR + 'styles',
    LESS_MAIN_FILE  = LESS_SRC + '/main.less',
    IMAGES_SRC      = BASE_SRC_DIR + 'images';

// Try to open in the browser?
var openInBrowser = false,
    web_browser   = 'firefox'; //chrome, google-chrome, etc. Chrome does not appear to work on Mac.

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
    server        = lr(),
    gopen         = require('gulp-open');

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
  return gulp.src(LESS_MAIN_FILE)
    .pipe(less())
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function(){
  return gulp.src(JAVASCRIPTS_SRC + '/**/*.js')
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
  return gulp.src(IMAGES_SRC + '/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Images task complete' }));
});

// HTML
gulp.task('html', function() {
  return gulp.src(BASE_SRC_DIR + '**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Deployed HTML' }))
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img', 'dist/**/*.html'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function(){
  gulp.start('styles', 'scripts', 'images', 'html');
});

gulp.task('dev', function(){
  startExpress();
  startLiveReload();

  gulp.src('dist/index.html')
    .pipe(gopen("", { url: "http://localhost:" + EXPRESS_PORT, app: web_browser  }))

  gulp.watch(JAVASCRIPTS_SRC + '/**/*.js', ['scripts']);

  gulp.watch(LESS_SRC + '/**/*.less', ['styles']);

  gulp.watch(IMAGES_SRC + '/**/*', ['images']);

  gulp.watch(BASE_SRC_DIR + '/**/*.html', ['html']);
});
