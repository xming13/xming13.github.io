// Include gulp.
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var data = require('./src/data.json');
var configDev = require('./config.json');
var configProd = require('./config.prod.json');

// Include plugins.
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var shell = require('gulp-shell');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefix = require('gulp-autoprefixer');
var glob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var preprocess = require('gulp-preprocess');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var handlebars = require('gulp-compile-handlebars');

// default to dev config
var isProd = false;
var config = configDev;

// CSS.
gulp.task('css', function () {
  return gulp.src(config.css.src)
    .pipe(glob())
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title: "Gulp",
          subtitle: "Failure!",
          message: "Error: <%= error.message %>",
          sound: "Beep"
        })(error);
        this.emit('end');
      }
    }))
    //.pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true,
      includePaths: config.css.includePaths
    }))
    .pipe(autoprefix('last 5 versions', '> 1%', 'ie 9', 'ie 10'))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulpif(isProd, rename({extname: '.min.css'})))
    .pipe(gulp.dest(config.css.dest));
});

// JS
gulp.task('js', function () {
  return gulp.src(config.js.src)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    //.pipe(concat(config.js.file))
    .pipe(uglify())
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulpif(isProd, rename({extname: '.min.js'})))
    .pipe(gulp.dest(config.js.dest));
});

// Compress images.
gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(config.images.dest));
});

// Build html for development/production
gulp.task('html', function () {
  return gulp.src(config.html.src)
    .pipe(preprocess({context: {ENVIRONMENT: isProd ? 'prod' : 'dev'}}))
    .pipe(handlebars(data))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.html.dest));
});

// Build assets
gulp.task('build:assets', ['js', 'css', 'images']);

gulp.task('clean', function() {
  return gulp.src(config.destPaths, {read: false})
    .pipe(clean());
});

// Fonts.
//gulp.task('fonts', function() {
//  return gulp.src(config.fonts.src)
//    .pipe(gulp.dest(config.fonts.dest));
//});

// Production build
gulp.task('build', function() {
  isProd = true;
  config = configProd;

  runSequence('clean', 'build:assets', 'html');
});

// Static Server + Watch
gulp.task('serve', function () {
  runSequence('clean', 'build:assets', 'html', function() {
    browserSync.init({
      proxy: configDev.browserSyncProxy
    });

    gulp.watch(configDev.js.src, ['js']);
    gulp.watch(configDev.css.src, ['css']);
    gulp.watch(configDev.html.src, ['html']);
    //gulp.watch(config.images.src, ['images']);
    gulp.watch(['app/css/**/*', 'app/js/**/*', 'app/index.html']).on('change', browserSync.reload);
  });
});

// Default Task
gulp.task('default', ['serve']);