var http = require('http'),
	format = require('util').format,
	port = 8080;

// static
var hit_count = 0;

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(format('<h2>This website has been hit %d times</h2>', ++hit_count));
}).listen(port);

console.log('Server listening - localhost:' + port);