module.exports = function(grunt) {

  // Configuration goes here
  grunt.initConfig({
  
    // Configure the copy task to move files from the development to production folders
    copy: {
      main: {
        files: [
          {expand: true, src: 'dev/images/*.svg', dest: 'prod/images', flatten: true},
        ]
      }
    },

    imagemin: {
      dynamic: {
        files : [{
          expand: true,
          cwd: 'dev/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'prod/images'
        }]
      }
    },

    cssmin: {
      combine: {
        files: {
          'prod/css/style.css': ['dev/stylesheets/normalize.css', 'dev/stylesheets/app.css']
        }
      }
    },

    processhtml: {
      dev: {
        options: {
          data: {
            message: 'This is development environment'
          }
        },
        files: {
          'prod/index.html': ['dev/index.html']
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'prod/js/html5polyfill.js': ['dev/javascripts/vendor/jquery.js', 'dev/javascripts/html5polyfill/simple-expand.js', 'dev/javascripts/html5polyfill/list.min.js', 'dev/javascripts/html5polyfill/jquery.ba-hashchange.min.js', 'dev/javascripts/html5polyfill/custom.js', 'dev/javascripts/foundation/foundation.js'],
          'prod/js/modernizr.js' : ['dev/javascripts/vendor/custom.modernizr.js']
        }
      }
    }


  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Define your tasks here
  grunt.registerTask('default', ['copy', 'imagemin', 'cssmin', 'processhtml', 'uglify']);

};
