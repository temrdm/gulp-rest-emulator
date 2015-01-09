gulp-rest-emulator
===========

# Installation

    npm install --save gulp-rest-emulator

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
            rewriteTemplate: 'index.html'
        };
        return gulp.src('./mocks/**/*.js')
            .pipe(restEmulator(options));
    });

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
        ]
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
            ]
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
                ]
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
                code: 201
            },
            error: {
                code: 405
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