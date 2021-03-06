var map = require('map-stream'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

module.exports = function (options) {
    if (!options) {
        options = {};
    }

    if (options.name && /^[^A-z0-9$_]+$/.test(options.name)){
        throw new PluginError('gulp-wrap-factory', 'Incorrect global variable name');
    }

    return map(function(file, cb){
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError('gulp-wrap-factory', 'Streaming not supported'));
        }

        file.contents = new Buffer(wrapper(file.contents.toString(), options.name).join('\n'));

        cb(null, file);
    });
};

function wrapper(code, name){
    var exports = name ? ('this.' + name) : 'module.exports';

    return [
        exports + ' = function (window) {',
        '  var document = window.document;',
        '  return (function () {',
        '    return ' + code,
        '  }).call(window);',
        '};'
    ];
}