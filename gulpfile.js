'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const globby = require('globby');
const through = require('through2');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({
      includePaths: [
        './node_modules/bootstrap-sass/assets/stylesheets/',
        './node_modules/',
      ],
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('javascript', () => {
  const bundledStream = through();

  bundledStream
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add gulp plugins to the pipeline here.
      // .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));

  globby(['./src/js/*.js']).then((entries) => {
    const b = browserify({
      entries: entries,
      debug: true,
      transform: [babelify]
    });

    b.bundle().pipe(bundledStream);
  }).catch((err) => {
    bundledStream.emit('error', err);
  });

  return bundledStream;
});

gulp.task('watch', () => {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['javascript']);
  gulp.watch('./dist/**/*.html');

  browserSync.init({
    files: ['./dist/**/*'],
    open: 'external',
    reloadDebounce: 350,
    server: {
      baseDir: './dist/'
    }
  });
});

gulp.task('default', ['watch']);
