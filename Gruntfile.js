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
            pack: {
                // webpack options
                entry: "./mod/index.js",
                output: {
                    path: "pack/",
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
                watch: false,
                hot: false,
                keepalive: false,
                inline: false,
                progress: false // Don't show progress
            }
        },
        uglify: {
            js: {
                options: {
                    sourceMap: true,
                    screwIE8: true,
                    sourceMapIn: 'pack/bundle.js.map',
                    sourceMapRoot: 'src'
                },
                files: {
                    'js/bundle.min.js': ['pack/bundle.js']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, {
        scope : 'devDependencies'
    });

    grunt.registerTask('default', ['babel', 'webpack', 'uglify']);
}

module.exports = wrapper;
