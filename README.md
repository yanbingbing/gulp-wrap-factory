# gulp-wrap-factory

> Wrap Factory module

## Install

```sh
npm install --save-dev gulp-wrap-factory
```

## Example

```js
var gulp = require('gulp'),
    wrap = require('gulp-wrap-factory');

gulp.task('default', function(){
    return gulp.src('fn-module.js')
        .pipe(wrap({ name: 'Base' }))
        .pipe(gulp.dest('dest/'));
});
```

Example input:

```js
// my coding goes here.
console.info(this, window, document);
```

Example output (`name: 'Base'`):

```js
(function (global, factory) {
    if (typeof exports !== "undefined") {
        module.exports = factory;
    } else {
        global.Base = factory;
    }
})(this, function (window, document) {
    (function () {
        // my coding goes here.
        console.info(this, window, document);
    }).call(window)
});
```

## Options

String `name` - valid name of global variable which should be available in browser.
