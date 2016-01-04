var map = require('map-stream'),
	gutil = require('gulp-util'),
	PluginError = gutil.PluginError;

module.exports = function(options){
	if(!options.name){
		throw new PluginError('gulp-wrap-factory', 'Variable not specified');
	}

	if(/^[^A-z0-9$_]+$/.test(options.name)){
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
  return [
    '(function (global, factory) {',
      'if (typeof exports !== "undefined") {',
         'module.exports = factory;',
      '} else {',
        'global.'+ name +' = factory;',
      '}',
    '})(this, function (window, document) {',
      '(function () {'+code+'}).call(window)',
    '});'];
}