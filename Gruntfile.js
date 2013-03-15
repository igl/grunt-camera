module.exports = function(grunt) {
    grunt.initConfig({
        camera: {
            dev: {
                dest: 'screenshots/',
                pages: [
                    'localhost:3000/index.html',
                    'localhost:3000/about.html',
                    'localhost:3000/categories.html'
                ],
                width: 1024,
                height: 768
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', function () {
        grunt.log.subhead('Available Tasks:');
        grunt.log.ok(Object.keys(grunt.task._tasks).join('\n'));
    });
};
