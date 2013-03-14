'use strict';
var child = require('child_process'),
    util = require('util'),
    path = require('path');

module.exports = function (grunt) {

    grunt.registerMultiTask('camera', 'PhantomJS Camera', function () {
        var cb = this.async(),
            cmd = 'phantomjs runner.js'
            options = {
                width: 800,
                height: 600,
                dest: '',
                pages: []
            },
			spawnPhantom = function () {
				var cp = child.exec(cmd, options.execOptions, function (err, stdout, stderr) {
						if (_.isFunction(options.callback)) {
							options.callback.call(this, err, stdout, stderr, cb);
						} else {
							if (err && options.failOnError) {
								grunt.warn(err);
							}
							cb();
						}
					});
			};

        child.exec('phantomjs -v', function (err, stdout, stderr) {
			if (err) grunt.warn(stderr);
			grunt.log.ok(util.format('Using PhantomJS %s...', stdout.trim()));

			// todo: spawnPhantom( mixin(<defaults>, <args>) ) ...
		});

		// Debug:
		//console.log('grunt-camera: cmd: %j, options:', cmd, options, this.data);

    });
};
