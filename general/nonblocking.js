var http = require('http'),
	format = require('util').format,
	fs = require('fs'),
	new_line = '\r\n',
	log_file_name = './log.txt';

// write text to a file
function write (file_name, text) {
	fs.appendFile(file_name, text + new_line, function () {
		console.log(format('%s written to "%s"', text, file_name));
	});
}

setInterval(function () {
	write(log_file_name, 'event1');
}, 1000);

setInterval(function () {
	write(log_file_name, 'event2');
}, 500);

http.createServer(function (req, res) {
	console.log('serving request');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('hello world');
}).listen(8085);