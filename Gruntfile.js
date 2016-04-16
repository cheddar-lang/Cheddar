module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                presets: ['es2015'],
                plugins: [
                    'babel-plugin-transform-class-properties',
                    'babel-plugin-add-module-exports'
                ]
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