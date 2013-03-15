'use strict';
var child = require('child_process'),
    util = require('util'),
    path = require('path'),
    async = require('async'),
    mixin = function(origin, add) {
        if (!add || typeof add !== 'object') return origin;

        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
            origin[keys[i]] = add[keys[i]];
        }
        return origin;
    };

module.exports = function (grunt) {

    grunt.registerMultiTask('camera', 'PhantomJS Camera', function () {
        var cwd = process.cwd(),
            done = this.async(),
            opts = mixin({
                dest: '',
                pages: [],
                width: 800,
                height: 600
            }, this.data),
            findPhantom = function (name, cb) {
                child.exec(name + ' -v', {}, function (err, stdout, stderr) {
                    if (err) return cb(stderr);
                    cb(null, util.format('Using PhantomJS %s', stdout.trim()));
                });
            },
            createScreenshots = function () {
                async.each(opts.pages, spawnPhantom, function (err) {
                    if (err) return grunt.warn(err);
                    done();
                });
            },
			spawnPhantom = function (url, cb) {
                var filename = path.join(cwd, opts.dest, path.basename(url, path.extname(url)) + '.png');
                if (!url.match(/^http/i)) {
                    url = 'http://' + url;
                }
                child.spawn(
                      'phantomjs'
                    , [ 'runner.js', url, filename, opts.width, opts.height]
                    , { cwd: cwd, detached: false, stdio: 'inherit' }
                    , function (err, stdout, stderr) {
                        if (err) return cb(stderr);
                        cb(null);
                    }
                );
            };

        findPhantom('phantomjs', function (err, msg) {
            if (err) {
                if (process.platform === 'win32') {
                    findPhantom('phantomjs.exe', function (err, msg) {
                        if (err) return grunt.warn(stderr);
                        grunt.log.ok(msg);
                        createScreenshots();
                    });
                } else {
                    return grunt.warn(stderr);
                }
            } else {
                grunt.log.ok(msg);
                createScreenshots();
            }
        });

    });
};
