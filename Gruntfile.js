module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.es6'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', ['babel'])
};