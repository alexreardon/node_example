var express = require('express'),
	app = express(),
	format = require('util').format,
	path = require('path'),
	server;

var dir = process.argv[2] || '.';

app.use(express.directory(path.resolve(dir)));
app.use(express.static(path.resolve(dir)));

var server = app.listen(0, function () {
	console.log(format('location %s listening on port %d', dir, server.address().port));
});