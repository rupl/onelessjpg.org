/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      css: 'css',
      js: 'js',
    },

    jshint: {
      options: {},
      dist: {
        files: {
          src: ['Gruntfile.js', 'src/**/*.js']
        }
      },
    },

    concat: {
      options: {
        separator: ';'
      },
      css: {
        src: ['src/css/main.css', 'src/css/syntax.css'],
        dest: 'css/main.css',
      },
    },

    autoprefixer: {
      options: {},
      default: {
        src: 'css/main.css'
      },
    },

    uglify: {
      dist: {
        files: {
          'js/final.min.js': ['src/js/poop.js']
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.png', '**/*.jpg'],
          dest: 'src/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '**/*.svg',
          dest: 'src/img'
        }]
      }
    },

    concurrent: {
        default: {
            tasks: ['jekyll:serve', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    },

    watch: {
      css: {
        files: ['src/css/*.css'],
        tasks: ['watchCss']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['watchJs']
      },
    },

    jekyll: {
      serve: {
        options: {
          serve: true,
          server_port: 4000,
          watch: true,
        },
      },
    }
  });

  // Load Plugins.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-jekyll');

  // Custom tasks.
  grunt.registerTask('watchCss', ['clean:css', 'concat', 'autoprefixer']);
  grunt.registerTask('watchJs', ['clean:js', 'jshint', 'uglify']);

  // Default task.
  grunt.registerTask('default', ['concurrent:default']);
};