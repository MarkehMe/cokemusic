module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'css/styles.css' : 'css/scss/styles.scss'
				}
			}
		},
		watch: {
			css: {
				files: [
					'css/scss/*.scss',
					'css/scss/**/*.scss',
				],
				tasks: ['sass']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
}