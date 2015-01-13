module.exports = function(grunt) {
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
// this is where you set up your Sass settings. Once you know what you're doing, you can change thse.
sass: {
dist: {
options: {
style: 'compressed'
},
files: {
'css/layouts/style.css': 'sass/style.scss'
}
}
}
});
// this is where you say, hey, I'm using that sass thing that I just created settings for.
grunt.loadNpmTasks('grunt-contrib-sass');
// this is where you have Grunt compile your sass when you type "grunt" into the terminal
grunt.registerTask('default', ['sass']);
};