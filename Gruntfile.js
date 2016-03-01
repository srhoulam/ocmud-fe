'use strict';

function wrapper(grunt) {
    grunt.initConfig({
        babel: {
            options: {
                sourceMap : true,
                plugins : ['transform-react-jsx'],
                presets : ['es2015', 'react']
            },
            src: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.js'],
                    dest: 'mod',
                    ext: '.js'
                }]
            }
        },
        webpack: {
            someName: {
                // webpack options
                entry: "./mod/index.js",
                output: {
                    path: "js/",
                    filename: "bundle.js",
                    sourceMapFilename: "[file].map"
                },
                stats: {
                    // Configure the console output
                    colors: true,
                    modules: false,
                    reasons: true
                },
                devtool: "source-map",
                progress: false // Don't show progress
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    screwIE8: true,
                    sourceMapIn: 'js/bundle.js.map',
                    sourceMapRoot: 'src'
                },
                files: {
                    'js/bundle.min.js': ['js/bundle.js']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, {
        scope : 'devDependencies'
    });

    grunt.registerTask('default', ['babel', 'webpack']);
}

module.exports = wrapper;
