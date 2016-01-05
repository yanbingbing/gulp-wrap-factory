var map = require('map-stream'),
	gutil = require('gulp-util'),
	PluginError = gutil.PluginError;

module.exports = function(){
	return map(function(file, cb){
		if (file.isNull()) {
			return cb(null, file);
		}

		if (file.isStream()) {
			return cb(new PluginError('gulp-wrap-factory', 'Streaming not supported'));
		}

		file.contents = new Buffer(wrapper(file.contents.toString()).join('\n'));

		cb(null, file);
	});
};

function wrapper(code) {
  return [
    'module.exports = function (window) {',
    '  var document = window.document;',
    '  return (function () {',
    '    return ' + code,
    '  }).call(window);',
    '};'];
}