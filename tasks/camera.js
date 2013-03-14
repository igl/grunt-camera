'use strict';
var exec = require('child_process').exec,
    path = require('path');

module.exports = function (grunt) {

    grunt.registerMultiTask('camera', 'PhantomJS Camera', function () {
        var cb = this.async(),
            options = {
                width: 800,
                height: 600,
                dest: '',
                pages: []
            },
            cmd = 'phantomjs runner.js';

        console.log('grunt-camera: cmd: %j, options:', cmd, options, this.data);

        return;

        var cp = exec(cmd, options.execOptions, function (err, stdout, stderr) {
                if (_.isFunction(options.callback)) {
                    options.callback.call(this, err, stdout, stderr, cb);
                } else {
                    if (err && options.failOnError) {
                        grunt.warn(err);
                    }
                    cb();
                }
            });


        if (options.stdout) {
            cp.stdout.pipe(process.stdout);
        }

        if (options.stderr) {
            cp.stderr.pipe(process.stderr);
        }
    });
};
