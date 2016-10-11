gulp-rest-emulator
===========

[![Join the chat at https://gitter.im/temrdm/gulp-rest-emulator](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/temrdm/gulp-rest-emulator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Installation

    npm install --save gulp-rest-emulator

# Links

* [Standalone node server](https://github.com/Pouja/node-rest-emulator)
* [Middleware](https://github.com/temrdm/rest-emulator)

# Usage

## Gulp

    var gulp = require('gulp');
    var restEmulator = require('gulp-rest-emulator');

    gulp.task('run', function () {
        // Options not require
        var options = {
            port: 8000,
            root: ['./'],
            rewriteNotFound: false,
            rewriteTemplate: 'index.html',
            corsEnable: false, // Set true to enable CORS
            corsOptions: {}, // CORS options, default all origins
            headers: {}, // Set headers for all response, default blank
            httpsEnable: false, // Set true to enable HTTPS
            httpsOptions: {} // HTTPS options
        };
        return gulp.src('./mocks/**/*.js')
            .pipe(restEmulator(options));
    });

    gulp.task('watch', ['run'], function () {
        gulp.watch('./mocks/**/*.js', ['run']);
    });

* [CORS options available here.](https://github.com/troygoode/node-cors#configuration-options)
* [HTTPS options available here.](https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener)

# Mock

## Example structure

  	mocks/
  	    default.js
  	    users/
  	        default.js
  	        custom.js
	    cities/
	       default.js
           custom.js
        country.js

## Mock syntax

### Basic

```
module.exports = {
    '/api/users': {
        data: [
            { name: 'John' },
            { name: 'Adam' }
        ],
        headers: {}, // Headers for current preset, default blank
        code: 200, // Default value
        timeout: 0 // Default value in ms
    },
    '/api/cities': {
        data: [
            { name: 'New York' },
            { name: 'Miami' }
        ]
    }
};
```

### Default

```
module.exports = {
    '/api/users': {
        GET: {
            data: [
                { name: 'John' },
                { name: 'Adam' }
            ],
            timeout: 100
        },
        POST: {
            data: {
                success: true
            },
            code: 201
        }
    }
};
```

### Full (with presets)

```
module.exports = {
    '/api/users': {
        GET: {
            default: {
                data: [
                    { name: 'John' },
                    { name: 'Adam' }
                ],
                headers: {
                    XTag: 12345
                }
            },
            blank: {
                data: []
            },
            increase: {
                data: [
                    { name: 'John' },
                    { name: 'Adam' },
                    { name: 'Clark' },
                    { name: 'Earl' }
                ]
            }
        },
        POST: {
            default: {
                data: {
                    success: true
                },
                code: 201,
                timeout: 1000
            },
            error: {
                code: 405,
                timeout: 2000
            }
        }
    },
    '/api/cities': {
        'GET': {
            data: [
                { name: 'New York' },
                { name: 'Miami' }
            ]
        }
    }
};

```

### Query params

```
module.exports = {
    '/api/users': {
        GET: {
            data: [
                { name: 'John' },
                { name: 'Adam' }
            ],
            headers: {
                XTag: 12345
            },
            query: {
                // Usage: /api/users/?name=Adam
                'name=Adam': {
                    data: [
                        { name: 'Adam' }
                    ],
                    headers: {
                        XTag: 54321
                    }
                },
                // Usage: /api/users/?name='John Doe'
                'name=John Doe': {
                    data: [
                        { name: 'John Doe' }
                    ]
                }
            },
            timeout: 100
        }
    }
};
```
