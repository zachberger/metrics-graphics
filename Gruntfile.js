module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src: './src/js/',
    dist:  './dist/',
    jsFiles: [
      '<%= src %>MG.js',
      '<%= src %>common/data_graphic.js',
      '<%= src %>common/bootstrap_tooltip_popover.js',
      '<%= src %>common/chart_title.js',
      '<%= src %>common/y_axis.js',
      '<%= src %>common/x_axis.js',
      '<%= src %>common/init.js',
      '<%= src %>common/markers.js',
      '<%= src %>common/window_listeners.js',
      '<%= src %>layout/bootstrap_dropdown.js',
      '<%= src %>layout/button.js',
      '<%= src %>charts/line.js',
      '<%= src %>charts/histogram.js',
      '<%= src %>charts/point.js',
      '<%= src %>charts/bar.js',
      '<%= src %>charts/table.js',
      '<%= src %>charts/missing.js',
      '<%= src %>misc/process.js',
      '<%= src %>misc/smoothers.js',
      '<%= src %>misc/formatters.js',
      '<%= src %>misc/transitions.js',
      '<%= src %>misc/utility.js',
      '<%= src %>misc/error.js',
      '<%= src %>'
    ],
    concat: {
      dist: {
        src: '<%= jsFiles %>',
        dest: '<%= dist %>metricsgraphics.js' 
      },
    },
    uglify: {
      dist: {
        src: '<%= dist %>metricsgraphics.js',
        dest: '<%= dist %>metricsgraphics.min.js'
      }
    },
    jshint: {
      files: '<%= dist %>metricsgraphics.js',
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: { 
          jQuery: true,
          d3: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    watch: {
      gruntfile: {
        files: '',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '',
        tasks: ['jshint:lib_test', '{%= test_task %}']
      }
    },
    qunit: {
      all: ['tests/**/*.html'],
      options: {
        timeout: 60000,
        coverage: {
          disposeCollector: true,
          src: ['src/**/*.js'],
          instrumentedFiles: 'temp/',
          lcovReport: 'report/',
          linesThresholdPct: 25 
        }
      },
    },
    coveralls: {
      options: {
        src: "report/lcov.info"
      },
      all: {
        src: "report/lcov.info"
      }
    }
  });

  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-qunit-istanbul');

  // Default task.
  grunt.registerTask('default', ['jshint', 'testem', 'concat', 'uglify']);
  grunt.registerTask('test', ['concat','uglify','qunit','coveralls'] );

};
