module.exports = function(grunt) {
  require('jit-grunt')(grunt);
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
	less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "assets/css/main.compiled.css": "assets/css/imports.less" // destination file and source file
        }
      },
	  production: {
		 options: {
			 paths: ["assets/css"],
			 cleancss: true
		 },
		 files: {"assets/css/main.compiled.css": "assets/css/imports.less"}
	  }
    },
    watch: {
        styles: {
            files: ['**/*.less'], // which files to watch
            tasks: ['less'],
            options: {
                nospawn: true
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify', 'grunt-contrib-less', 'grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less', 'watch']);

};