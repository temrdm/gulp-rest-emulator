'use strict';

var gulp = require('gulp');
var restEmulator = require('../');

gulp.task('run', function () {
    var options = {
        rewriteNotFound: true,
        corsEnable: true,
        headers: {
            XTag: '9876'
        }
    };
    return gulp.src('./mocks/**/*.js')
        .pipe(restEmulator(options));
});

gulp.task('watch', ['run'], function () {
    gulp.watch('./mocks/**/*.js', ['run']);
});

gulp.task('default', ['watch']);
