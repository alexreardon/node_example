var socket_io = require('socket.io'),
	io;

// PRIVATE

function on_join(name) {
	io.sockets.emit('text', { sender: name, text: 'joined the chat', event: true });
}

function on_message(err, name, message) {
	if (err) {
		return console.error(err);
	}
	io.sockets.emit('text', { sender: name, text: message });
}

function on_disconnect(err, name) {
	if (err) {
		return console.error(err);
	}

	// don't let everyone know if the user has not yet set their name
	if (name) {
		io.sockets.emit('text', { sender: name, text: 'has left the chat', event: true });
	}
}

// PUBLIC

function on_connect(socket) {
	socket.on('join', function (name) {
		socket.set('name', name, function () {
			on_join(name);
		});
	});

	socket.on('message', function (message) {
		socket.get('name', function(err, name){
			on_message(err, name, message);
		});
	});

	socket.on('disconnect', function () {
		socket.get('name', on_disconnect);
	});
}

function init(server) {
	io = socket_io.listen(server);
	io.sockets.on('connection', on_connect);
}

module.exports = {

	// public api
	init: init,
	on_connect: on_connect,

	// testing api
	_on_join: on_join,
	_on_message: on_message,
	_on_disconnect: on_disconnect

};