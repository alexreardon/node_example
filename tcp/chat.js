var net = require('net'),
	format = require('util').format,
	eol = require('os').EOL,
	port = 5000;

var sockets = [];

function broadcast(sender, message) {
	sockets.forEach(function (client) {

		// don't send the message to yourself!
		if (client !== sender) {
			client.write(format('%s: %s', sender.name, message));
		}
	});
}

function join_chat(client) {

	client.setEncoding('utf8');

	client.message_buffer = '';
	client.name = 'client' + (sockets.length + 1);

	sockets.push(client);

	// server log
	console.log('client joined!');
	console.log('amount of clients', sockets.length);

	// communication
	client.write('Welcome to the chat' + eol);
	broadcast(client, 'joined the chat!' + eol);

	// send data to sockets when eol is found
	client.on('data', function (data) {

		client.message_buffer += data;

		if (data === eol) {
			broadcast(client, client.message_buffer);
			client.message_buffer = '';
		}

	});

	client.on('end', function () {
		console.log('client left!');

		// remove the socket from array
		sockets.splice(sockets.indexOf(client), 1);

		console.log('amount of clients', sockets.length);

		broadcast(client, 'left the chat' + eol);
	});
}

net.createServer(join_chat).listen(port);

console.log('chat server listening on port ' + port);