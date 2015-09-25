module.exports = function (grunt) {

  // Project configuration.
  // Will need to be updated when structure available.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jasmine : {
            src : ['assets/js/modules/jquery-2.1.4.min.js', 'mock-ajax.js', 'assets/js/modules/API.js', 'assets/js/modules/utility.js'],
            options : {
                specs : 'tests/*.js'
            }
        },
        watch: {
            files: ['assets/js/**/*.js', 'tests/*js'],
            tasks: ['jasmine']
        }
    });

    // Register tasks.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
  
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'jasmine', 'watch']);

};