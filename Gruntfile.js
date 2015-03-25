module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                    {src: 'bower_components/bootstrap/dist/css/bootstrap.min.js', dest: 'bower_components/bootstrap/dist/css/'},
                    {src: 'bower_components/jquery/dist/jquery.min.js', dest: 'bower_components/jquery/dist/'},
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('default', ['compress']);

};