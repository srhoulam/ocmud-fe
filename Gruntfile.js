'use strict';

function wrapper(grunt) {
    grunt.initConfig({
        babel: {
            options: {
                sourceMap : true,
                plugins : ['transform-react-jsx'],
                presets : ['es2015', 'react']
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: 'jsx',
                    src: ['*.jsx'],
                    dest: 'js',
                    ext: '.js'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt, {
        scope : 'devDependencies'
    });

    grunt.registerTask('default', ['babel']);
}

module.exports = wrapper;
