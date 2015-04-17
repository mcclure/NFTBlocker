module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "mozilla-addon-sdk": {
            'latest': {
                options: {
                    revision: "latest", // default official revision 
                    dest_dir: "build_tools/"
                }
            }
        },
        jpm: {
            options: {
                src: "./firefox/",
                xpi: "./tmp/gte38/"
            }
        },
        "mozilla-cfx-xpi": {
            'stable': {
                options: {
                    "mozilla-addon-sdk": "latest",
                    extension_dir: "firefox",
                    dist_dir: "tmp/lte37/"
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['js/*'], dest: 'firefox/data/', filter: 'isFile'},
                    {expand: true, src: ['css/*'], dest: 'firefox/data/', filter: 'isFile'},
                    {expand: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: 'firefox/data/', filter: 'isFile'},
                    {src: 'options.html', dest: 'firefox/data/options.html'},
                    {src: 'package.json', dest: 'firefox/package.json'},
                    {expand: true, src: ['partial_*.html'], dest: 'firefox/data/', filter: 'isFile'},
                    {src: 'bower_components/angular/angular.min.js', dest: 'firefox/data/'},
                    {src: 'bower_components/angular-route/angular-route.min.js', dest: 'firefox/data/'},
                    {src: 'bower_components/bootstrap/dist/css/bootstrap.min.css', dest: 'firefox/data/'},
                    {src: 'bower_components/jquery/dist/jquery.min.js', dest: 'firefox/data/'},
                    {src: 'bower_components/angular-datatables/dist/angular-datatables.js', dest: 'firefox/data/'},
                    {src: 'bower_components/datatables/media/js/jquery.dataTables.js', dest: 'firefox/data/'},
                    {src: 'bower_components/datatables/media/css/jquery.dataTables.min.css', dest: 'firefox/data/'},
                    {src: 'bower_components/datatables/media/images/*', dest: 'firefox/data/'},
                ],
                options: {
                    process: function (content, srcpath) {
                        if (srcpath=="options.html")
                            return content.replace(/[\t ]*<script.*script>\r?\n?/g,"");
                        return content;
                    }
                }
            },
        },
        compress: {
            main: {
                options: {
                    archive: 'blockchain.zip'
                },
                files: [
                    {src: 'js/*', dest: ''},
                    {src: 'css/*', dest: ''},
                    {src: 'images/*', dest: ''},
                    {src: '*.html', dest: ''},
                    {src: '*.json', dest: ''},
                    {src: 'LICENSE', dest: ''},
                    {src: 'CONTRIBUTORS', dest: ''},
                    {src: 'README.md', dest: ''},
                    {src: 'bower_components/angular/angular.min.js', dest: ''},
                    {src: 'bower_components/angular-route/angular-route.min.js', dest: ''},
                    {src: 'bower_components/bootstrap/dist/css/bootstrap.min.css', dest: ''},
                    {src: 'bower_components/jquery/dist/jquery.min.js', dest: ''},
                    {src: 'bower_components/angular-datatables/dist/angular-datatables.min.js', dest: ''},
                    {src: 'bower_components/datatables/media/js/jquery.dataTables.min.js', dest: ''},
                    {src: 'bower_components/datatables/media/css/jquery.dataTables.min.css', dest: ''},
                    {src: 'bower_components/datatables/media/images/*', dest: ''},
                ]
            }
        },
        curl: {
          'firefox/data/bower_components/jquery/dist/jquery.min.js': 'http://code.jquery.com/jquery-2.1.3.min.js',
          'firefox/data/bower_components/angular/angular.min.js': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js',
          'firefox/data/bower_components/angular-route/angular-route.min.js': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.min.js',
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jpm');
    grunt.loadNpmTasks('grunt-mozilla-addon-sdk');
    grunt.loadNpmTasks('grunt-curl');

    // Default task(s).
    grunt.registerTask('default', ['compress']);
    grunt.registerTask('test-firefox', ['copy','jpm:run']);
    grunt.registerTask('build-firefox', ['copy','curl','jpm:xpi','mozilla-cfx-xpi:stable']);
    grunt.registerTask('build-chrome', ['compress:main']);
};