var express = require('express'),
	socket_io = require('socket.io'),
	path = require('path'),
	port = 8080,
	format = require('util').format,
	hbs = require('hbs'),
	ip = require('my-local-ip')() || 'localhost',
	app = express();

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
	res.render('index', { url: format('http://%s:%d', ip, port) });
});

// start server
var server = app.listen(port, function () {
	console.log('Chat server started on port ' + port);
});

// start io listener
var io = socket_io.listen(server);

function on_connect(socket) {
	socket.on('join', function (name) {
		socket.set('name', name, function () {
			io.sockets.emit('text', { sender: name, text: 'joined the chat', event: true });
		});
	});

	socket.on('message', function (message) {
		socket.get('name', function (err, name) {
			if (err) {
				return console.error(err);
			}
			io.sockets.emit('text', { sender: name, text: message });
		});
	});

	socket.on('disconnect', function () {
		socket.get('name', function (err, name) {
			if (err) {
				return console.error(err);
			}

			// don't let everyone know if the user has not yet set their name
			if (name) {
				io.sockets.emit('text', { sender: name, text: 'has left the chat', event: true });
			}

		});
	});
}

io.sockets.on('connection', on_connect);