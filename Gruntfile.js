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
        "mozilla-cfx-xpi": {
            'stable': {
                options: {
                    "mozilla-addon-sdk": "latest",
                    extension_dir: "firefox",
                    dist_dir: "tmp/dist-stable"
                }
            },
            'experimental': {
                options: {
                    "mozilla-addon-sdk": "latest",
                    extension_dir: "firefox",
                    dist_dir: "tmp/dist-experimental",
                    strip_sdk: false // true by default 
                }
            },
        },
        "mozilla-cfx": {
            'run_stable': {
                options: {
                    "mozilla-addon-sdk": "latest",
                    extension_dir: "firefox",
                    command: "run"
                }
            }
            /*,
            'run_experimental': {
                options: {
                    "mozilla-addon-sdk": "latest",
                    extension_dir: "firefox",
                    command: "run",
                    pipe_output: true
                }
            }*/
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['js/*'], dest: 'firefox/data/', filter: 'isFile'},
                    {expand: true, src: ['css/*'], dest: 'firefox/data/', filter: 'isFile'},
                    {expand: true, src: ['partial_*.html'], dest: 'firefox/data/', filter: 'isFile'},
                    // includes files within path and its sub-directories
                    {expand: true, src: ['bower_components/**'], dest: 'firefox/data/'}
                ],
            },
        },
        compress: {
            main: {
                options: {
                    archive: 'blockchain.zip'
                },
                files: [
                    {src: 'js/*', dest: 'js/'},
                    {src: 'css/*', dest: 'css/'},
                    {src: 'images/*', dest: 'images/'},
                    {src: '*.html', dest: ''},
                    {src: '*.json', dest: ''},
                    {src: 'manifest.json', dest: ''},
                    {src: 'LICENSE', dest: ''},
                    {src: 'CONTRIBUTORS', dest: ''},
                    {src: 'README.md', dest: ''},
                    {src: 'bower_components/angular/angular.min.js', dest: 'bower_components/angular/'},
                    {src: 'bower_components/angular-route/angular-route.min.js', dest: 'bower_components/angular-route/'},
                    {src: 'bower_components/bootstrap/dist/css/bootstrap.min.js', dest: 'bower_components/bootstrap/dist/css/'},
                    {src: 'bower_components/jquery/dist/jquery.min.js', dest: 'bower_components/jquery/dist/'},
                    {src: 'bower_components/angular-datatables/dist/angular-datatables.min.js', dest: 'bower_components/angular-datatables/dist/'},
                    {src: 'bower_components/datatables/media/js/jquery.dataTables.min.js', dest: 'bower_components/datatables/media/js/'},
                    {src: 'bower_components/datatables/media/css/jquery.dataTables.min.css', dest: 'bower_components/datatables/media/css/'},
                    {src: 'bower_components/datatables/media/images/*', dest: 'bower_components/datatables/media/images/'},
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mozilla-addon-sdk');

    // Default task(s).
    grunt.registerTask('default', ['compress']);
    grunt.registerTask('test-firefox', ['copy','mozilla-cfx']);
};