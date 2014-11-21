module.exports = function(grunt) {
  
  grunt.config.set('bower', {
    dev: {
      dest: '.tmp/public',
      js_dest: '.tmp/public/js',
      css_dest: '.tmp/public/styles',
      eot_dest: '.tmp/public/styles',
      ttf_dest: '.tmp/public/styles',
      svg_dest: '.tmp/public/styles',
      woff_dest: '.tmp/public/styles',
      otf_dest: '.tmp/public/styles'
    }
  });

  grunt.loadNpmTasks('grunt-bower');

};