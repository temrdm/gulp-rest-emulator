var es = require('event-stream');
var restEmulator = require('rest-emulator');
var express = require('express');
var gutil = require('gulp-util');
var _ = require('lodash');
var serveStatic = require('serve-static');
var path = require('path');
var cors = require('cors');

exports = module.exports = gulpRestEmulator;

function gulpRestEmulator(options) {
    var app = express();
    var config = [];

    options = getNormalizeOptions(options);

    return es.through(read, end);

    function read(file) {
        var stream = this;
        try {
            config.push(require(file.path));
        } catch (error) {
            throw new gutil.PluginError('gulp-rest-emulator', 'Cannot read mock module ' + file.path);
        }
        return stream.emit('data', file);
    }

    function end() {
        var stream = this;

        if (options.corsEnable) {
            app.use(cors(options.corsOptions));
        }

        app.use(restEmulator(config));

        _.each(options.root, serve);

        if (options.rewriteNotFound) {
            var indexFile = path.resolve('.', options.rewriteTemplate);

            app.get('*', function (req, res) {
                return res.sendFile(indexFile);
            });
        }

        stream.emit('end');

        return app.listen(options.port);
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
        corsOptions: {}
    };

    if (!_.isPlainObject(options)) {
        return defaults;
    }

    return _.defaults(options, defaults);
}