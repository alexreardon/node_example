module.exports = function (grunt) {

	var node_js_files = [
			'**/*.js',
			'!node_modules/**/*.js',
			'!public/**/*.js',
			'!test/client/**/*.js'
		],
		client_js_files = [
			'public/js/app.js'
		],
		client_lib_files = [
			'public/js/lib/jquery.min.js',
			'public/js/lib/underscore.js',
			'public/js/lib/backbone.js',
			'public/js/lib/socket.io.js'
		],
		less_files = [
			'public/less/style.less'
		],
		client_build_file = 'public/js/build.js',
		less_build_file = 'public/less/less.build.css',
		css_build_file = 'public/css/build.css';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			client: {
				options: grunt.file.readJSON('public/js/.jshintrc'),
				files: {
					src: client_js_files
				}
			},
			node: {
				options: grunt.file.readJSON('../.jshintrc'),
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
				src: [ 'public/css/bootstrap.min.css', less_build_file ],
				dest: css_build_file
			}
		},

		less: {
			dev: {
				files: {
					'public/less/less.build.css': less_files
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

		// server side mocha tests
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/server/**/*.js']
			}
		},

		// client side mocha tests
		// currently not working - not happy!
		mocha: {
			test1: {
				src: [ 'test/client/runner.html' ],
				options: {
					run: true,
					log: true
				}

			}
		},

		// run jobs again when files change
		watch: {
			node_js: {
				tasks: ['jshint:node', 'mochaTest'],
				files: node_js_files
			},
			client_js: {
				// could add phantomjs mocha test here.
				// only issue is that is that it could be slow
				tasks: ['concat:js'],
				files: client_lib_files.concat(client_js_files)
			},
			less: {
				tasks: ['less:dev', 'concat:css'],
				files: less_files
			}
		},

		// run tasks at the same time (nodemon takes a while to startup)
		concurrent: {
			target: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		// node server
		nodemon: {
			dev: {
				options: {
					file: 'server.js',
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

	// server side mocha
	grunt.loadNpmTasks('grunt-mocha-test');

	// client side mocha with phantomjs
	grunt.loadNpmTasks('grunt-mocha');

	//Development
	grunt.registerTask('dev', ['jshint','less:dev', 'concat:js', 'concat:css']);
	grunt.registerTask('test', ['dev', 'mochaTest', 'mocha']);
	grunt.registerTask('run', ['concurrent:target']);

	//Release
	grunt.registerTask('default', ['dev', 'uglify:prod']);

};