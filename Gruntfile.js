const child_process = require('child_process');
const path = require('path');

const $HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                presets: ['es2015'],
                plugins: [
                    'babel-plugin-transform-class-properties',
                    'babel-plugin-add-module-exports'
                ],
                minified: grunt.option('minified') || false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.es6'],
                    dest: 'dist/',
                    ext: '.js'
                }]
            }
        },

        copy: {
            bin: {
                options: {
                    mode: "777"
                },
                expand: true,
                cwd: 'src/',
                src: [
                    'cli/cheddar'
                ],
                dest: 'dist/'
            }
        }
    });

    grunt.registerTask('build', ['babel', 'copy:bin']);
    grunt.registerTask('install', 'Installs and initalizes Cheddar', function() {
        var done = this.async();

        var RCLOC = grunt.option('rc') || 'bashrc';
        var METHOD = grunt.option('method') || 'path';
        var M;

        if (METHOD === "alias") {
            console.log("Installing using `alias` method");
            console.log(`Using: '${path.resolve()}/bin/alias'`);

            M = child_process.execFile(`${path.resolve()}/bin/alias`, [
                $HOME + "/." + RCLOC
            ], done);

            M.stdout.on('data', data => process.stdout.write(data.toString()));
        }
        else if (METHOD === "path") {
            console.log("Installing using `path` method");
            console.log(`Using: '${path.resolve()}/bin/path'`);

            M = child_process.execFile(`${path.resolve()}/bin/path`, [
                grunt.option('rpath') || '/usr/local'
            ], done);
            M.stdout.on('data', data => process.stdout.write(data.toString()));
        }
        else {
            throw new Error(`Unknown installation method '${METHOD}'`);
        }

    });
};
