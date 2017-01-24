module.exports = function (grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['site/js/*.js', '!site/js/**.min.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['site/css/*.scss'],
        tasks: ['sasslint', 'sass', 'autoprefixer', 'cssmin'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['site/**/*.html'],
        tasks: ['htmllint'],
        options: {
          spawn: false
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'site/css/style.css': 'site/css/style.scss'
        }
      }
    },
    uglify: {
      build: {
        src: 'site/js/main.js',
        dest: 'site/js/main.min.js'
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'site/css/style.css': 'site/css/style.css'
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['gruntfile.js', 'site/js/*.js', '!site/js/**.min.js']
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'site/css/*.css',
            'site/js/*.js',
            'site/**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './',
          browser: "safari",
          reloadOnRestart: true,
          startPath: "/site/index.html"
          //logLevel: "silent"
        }
      }
    },
    htmllint: {
      options: {},
      src: [
        'site/**/*.html'
      ]
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'site/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'site/css/',
          ext: '.min.css'
        }]
      }
    },
    sasslint: {
      options: {
        configFile: ''
      },
      target: ['site/css/**/*.scss', '!site/css/frameworks']
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  // JS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //CSS
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //HTML
  grunt.loadNpmTasks('grunt-htmllint');
  // WorkFlow
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('manual', ['jshint', 'uglify', 'sasslint', 'sass', 'autoprefixer', 'cssmin']);
  grunt.registerTask('lint', ['jshint', 'htmllint', 'sasslint']);
  grunt.registerTask('minify', ['uglify', 'cssmin']);
};
