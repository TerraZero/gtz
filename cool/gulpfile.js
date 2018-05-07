'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

gulp.task('default', function () {
  return gulp.src('hallo.pug')
    .pipe(pug())
    .pipe(gulp.dest('cool'));
});
