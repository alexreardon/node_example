var express = require('express'),
	path = require('path'),
	format = require('util').format,
	hbs = require('hbs'),
	ip = require('my-local-ip')() || 'localhost',
	app = express();

// port
app.set('port', 8080);

// views
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware
app.use(express.logger('dev'));
app.use(app.router);

// static file serving
app.use('/public', express.static(path.join(__dirname, '/public')));

// main route
app.get('/', function (req, res) {
	res.render('index', { url: format('http://%s:%d', ip, app.get('port')) });
});

module.exports = app;