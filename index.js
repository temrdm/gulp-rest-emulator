var es = require('event-stream');
var restEmulator = require('rest-emulator');
var express = require('express');
var gutil = require('gulp-util');
var _ = require('lodash');
var serveStatic = require('serve-static');
var path = require('path');
var cors = require('cors');
var server;

exports = module.exports = gulpRestEmulator;

function gulpRestEmulator(options) {
    var app = express();
    var config = [];
    var restInstance;

    options = getNormalizeOptions(options);

    return es.through(read, end);

    function read(file) {
        var stream = this;

        if (require.cache[file.path]) {
            delete require.cache[file.path];
        }

        try {
            config.push(require(file.path));
        } catch (error) {
            throw new gutil.PluginError('gulp-rest-emulator', 'Cannot read mock module ' + file.path);
        }

        return stream.emit('data', file);
    }

    function end() {
        var stream = this;

        if (_.keys(options.headers).length) {
            app.use(function (req, res, next) {
                res.set(options.headers);
                next();
            })
        }

        if (options.corsEnable) {
            app.use(cors(options.corsOptions));
        }

        if (restInstance) {
            restInstance.updateConfing(config);
        } else {
            restInstance = restEmulator(config, options.restOptions || {});
            app.use(restInstance.middleware);
        }

        _.each(options.root, serve);

        if (options.rewriteNotFound) {
            var indexFile = path.resolve('.', options.rewriteTemplate);

            app.get('*', function (req, res) {
                return res.sendFile(indexFile);
            });
        }

        stream.emit('end');

        if (!server) {
            server = app.listen(options.port);
        }

        return server;
    }

    function serve(root) {
        app.use(serveStatic(root));
    }
}

function getNormalizeOptions(options) {
    var defaults = {
        port: 8000,
        root: ['./'],
        rewriteNotFound: false,
        rewriteTemplate: 'index.html',
        corsEnable: false,
        corsOptions: {},
        headers: {}
    };

    if (!_.isPlainObject(options)) {
        return defaults;
    }

    return _.defaults(options, defaults);
}