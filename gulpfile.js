'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
});