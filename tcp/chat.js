var net = require('net'),
	format = require('util').format,
	port = 5000;

var sockets = [];

function broadcast (sender, message) {
	sockets.forEach(function (client) {

		// don't send the message to yourself!
		if (client !== sender) {
			client.write(format('%s: %s', sender.name, message));
		}
	});
}

function join_chat (client) {
	client.setEncoding('utf8');
	client.message_buffer = '';
	client.name = 'client' + (sockets.length + 1);

	sockets.push(client);

	client.write('Welcome to the chat\r\n');

	broadcast(client, 'joined the chat!\r\n');

	client.on('data', function (data) {

		client.message_buffer += data;

		if (data === '\r\n') {
			broadcast(client, client.message_buffer);
			client.message_buffer = '';
		}

	});
}

net.createServer(join_chat).listen(port);

console.log('chat server listening on port ' + port);