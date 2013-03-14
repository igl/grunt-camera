module.exports = function(grunt) {
    grunt.initConfig({
        camera: {
            dev: {
                width: 1024,
                height: 768,
                dest: 'screenshots/',
                pages: [
                    'localhost:3000',
                    'localhost:3000/about',
                    'localhost:3000/categories'
                ]
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', function () {
        grunt.log.subhead('Available Tasks:');
        grunt.log.ok(Object.keys(grunt.task._tasks).join('\n'));
    });
};
