var app = require('./app'),
	sockets = require('./sockets');

// start server
var server = app.listen(app.get('port'), function () {
	console.log('Chat server started on port ' + app.get('port'));
});

sockets.init(server);