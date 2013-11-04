module.exports = function (grunt) {

	var node_js_files = [
			'chat/app.js'
		],
		client_js_files = [
			'chat/public/js/app.js'
		],
		client_lib_files = [
			'chat/public/js/lib/jquery.min.js',
			'chat/public/js/lib/underscore.js',
			'chat/public/js/lib/backbone.js',
			'chat/public/js/lib/socket.io.js'
		],
		less_files = [
			'chat/public/less/style.less'
		],
		client_build_file = 'chat/public/js/build.js',
		less_build_file = 'chat/public/less/less.build.css',
		css_build_file = 'chat/public/css/build.css';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			client: {
				options: grunt.file.readJSON('chat/public/js/.jshintrc'),
				files: {
					src: client_js_files
				}
			},
			node: {
				options: grunt.file.readJSON('.jshintrc'),
				files: {
					src: node_js_files
				}
			}
		},

		concat: {
			js: {
				src: client_lib_files.concat(client_js_files),
				dest: client_build_file
			},
			css: {
				src: [ 'chat/public/css/bootstrap.min.css', less_build_file ],
				dest: css_build_file
			}
		},

		less: {
			dev: {
				files: {
					'chat/public/less/less.build.css': less_files
				}
			}
		},

		uglify: {
			prod: {
				options: {
					mangle: false,
					compress: true,
					report: 'gzip',
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
						'<%= grunt.template.today("dd-mm-yyyy") %> */'
				},
				files: [
					{client_build_file: client_build_file}
				]
			}
		},

		watch: {
			node_js: {
				tasks: ['jshint:node'],
				files: node_js_files
			},
			client_js: {
				tasks: ['concat:js'],
				files: client_lib_files.concat(client_js_files)
			},
			less: {
				tasks: ['less:dev', 'concat:css'],
				files: less_files
			}
		},

		concurrent: {
			target: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		nodemon: {
			dev: {
				options: {
					file: 'chat/app.js',
					watchedExtensions: ['js', 'hbs']
				}
			}
		}
	});

	//Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	//Development
	grunt.registerTask('dev', ['jshint','less:dev', 'concat:js', 'concat:css']);
	grunt.registerTask('run', ['concurrent:target']);

	//Release
	grunt.registerTask('default', ['dev', 'uglify:prod']);

};