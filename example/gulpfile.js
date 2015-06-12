'use strict';

var gulp = require('gulp');
var restEmulator = require('../');

gulp.task('run', function () {
    var options = {
        rewriteNotFound: true,
        corsEnable: true
    };
    return gulp.src('./mocks/**/*.js')
        .pipe(restEmulator(options));
});

gulp.task('watch', ['run'], function () {
    gulp.watch('./mocks/**/*.js', ['run']);
});