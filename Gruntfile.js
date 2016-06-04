const exec = require('child_process').exec;
const path = require('path');
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

    grunt.registerTask('build', ['babel']);
    grunt.registerTask('install', 'Installs and initalizes Cheddar', () => {
        var RCLOC = grunt.option('rc') || '~/.bashrc';
        var METHOD = grunt.option('method') || 'alias';

        if (!grunt.option('no-build'))
            grunt.task.run('build');

        if (METHOD === "alias") {
            exec(`bash ${path.resolve()}/script/alias ${RCLOC}`);
        } else {
            grunt.util.error(`Unknown installation method '${METHOD}'`);
        }

    });
};
