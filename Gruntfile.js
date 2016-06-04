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
                ]
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
        }
    });

    grunt.registerTask('build', ['babel']);
    grunt.registerTask('install', 'Installs and initalizes Cheddar', function() {
        var done = this.async();

        var RCLOC = grunt.option('rc') || 'bashrc';
        var METHOD = grunt.option('method') || 'alias';
        var M;

        if (!grunt.option('no-build'))
            grunt.task.run('build');

        if (METHOD === "alias") {
            console.log("Installing using `alias` method");
            console.log(`Using: '${path.resolve()}/script/alias'`);

            M = child_process.execFile(`${path.resolve()}/script/alias`, [
                $HOME + "/." + RCLOC
            ], done);

            M.stdout.on('data', data => process.stdout.write(data.toString()));
        }
        else {
            throw new Error(`Unknown installation method '${METHOD}'`);
        }

    });
};
