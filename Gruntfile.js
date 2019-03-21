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
                    {src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: ''},
                    {src: 'bower_components/jquery/dist/jquery.min.js', dest: ''},
                    {src: 'bower_components/angular-datatables/dist/angular-datatables.min.js', dest: ''},
                    {src: 'bower_components/datatables/media/js/jquery.dataTables.min.js', dest: ''},
                    {src: 'bower_components/datatables/media/css/jquery.dataTables.min.css', dest: ''},
                    {src: 'bower_components/datatables/media/images/*', dest: ''},
                ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('default', ['build-chrome']);
    grunt.registerTask('build-chrome', ['compress:main']);
};