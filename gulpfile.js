'use strict';

const path = require('path');

const gulp = require('gulp');

const sass = require('gulp-sass');
const pug = require('gulp-pug');

const concat = require('gulp-concat');
const rename = require('gulp-rename');
const insert = require('gulp-insert');

const sourcemaps = require('gulp-sourcemaps');

const paths = {
  sass: {
    files: ['components/**/*.sass', '!components/**/_*.sass'],
    watch: 'components/**/*.sass',
    dest: 'src/css',
  },
  pug: {
    files: ['components/**/*.pug', '!components/**/_*.pug'],
    watch: 'components/**/*.pug',
    dest: 'src/html',
  },
  index: {
    files: ['components/index/_index.pug'],
    watch: ['components/index/_index.pug'],
    dest: 'src',
  }
};

const errorHandler = function (name) {
  return function (err) {
    console.error('########### ERROR ' + name.toUpperCase() + ' ############');
    // err.showStack = true;
    err.showProperties = true;
    console.error(err.toString());
    console.error('########### ERROR ' + name.toUpperCase() + ' ############');
    this.emit('end')
  };
};

gulp.task('sass', function () {
  return gulp.src(paths.sass.files)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', errorHandler('sass')))
    .pipe(sourcemaps.write())
    .pipe(concat('system.css'))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('pug', function () {
  return gulp.src(paths.pug.files)
    .pipe(pug({
      client: true,
      basedir: __dirname + '/components',
    }).on('error', errorHandler('pug')))
    .pipe(rename(function (file) {
      const parts = file.dirname.split(path.sep);

      file.basename = parts.join('.');
      file.dirname = '';
    }))
    .pipe(insert.append('module.exports = template;'))
    .pipe(gulp.dest(paths.pug.dest));
});

gulp.task('index', function () {
  return gulp.src(paths.index.files)
    .pipe(pug({
      basedir: __dirname + '/components',
    }).on('error', errorHandler('pug')))
    .pipe(rename(function (file) {
      file.basename = 'index';
      file.dirname = '';
    }))
    .pipe(gulp.dest(paths.index.dest));
});

gulp.task('build', ['sass', 'pug', 'index']);

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.sass.watch, ['sass']);
  gulp.watch(paths.pug.watch, ['pug']);
  gulp.watch(paths.index.watch, ['index']);
});

gulp.task('default', ['build']);
