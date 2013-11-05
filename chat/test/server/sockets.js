var expect = require('expect.js'),
	sinon = require('sinon'),
	http = require('http'),
	socket_io = require('socket.io'),
	sockets = require('../../sockets');

var fake_server,
	fake_io,
	name = 'Alex',
	message = 'hello world';

describe('app', function () {

	beforeEach(function () {
		fake_io = {
			sockets: {
				emit: sinon.stub(),
				on: sinon.stub()
			}
		};
		fake_server = http.createServer(function (req, res) {
		});

		sinon.stub(console, 'error');
		sinon.stub(socket_io, 'listen').returns(fake_io);
		sockets.init(fake_server);
	});

	afterEach(function () {
		socket_io.listen.restore();
		console.error.restore();
		fake_io = null;
		fake_server = null;
	});

	describe('init', function () {

		it('should listen to the passed server', function () {
			expect(socket_io.listen.calledWithExactly(fake_server));
		});

		it('should call on_connect on the connection event', function () {
			expect(fake_io.sockets.on.calledWithExactly('connection', sockets.on_connect));
		});

	});

	describe('on_join', function () {

		it('should send a message indicating somebody has joined the chat', function () {
			sockets._on_join('Alex');
			expect(fake_io.sockets.emit.calledOnce).to.be(true);
			expect(fake_io.sockets.emit.calledWith('text')).to.be(true);
		});

		it('should emit an event flag', function () {
			sockets._on_join('Alex');
			expect(fake_io.sockets.emit.args[0][1].event).to.be(true);
		});

	});

	describe('on_message', function () {

		it('should call console.error on error', function () {
			sockets._on_message({});
			expect(console.error.calledOnce).to.be(true);
		});

		it('should not emit on an error', function () {
			sockets._on_message({});
			expect(fake_io.sockets.emit.called).to.be(false);
		});

		it('should emit the sender and message on success', function () {
			var name = 'Alex',
				message = 'hello world';

			sockets._on_message(null, name, message);
			expect(fake_io.sockets.emit.calledWithExactly('text', { sender: name, text: message })).to.be(true);
		});

		it('should not emit an event flag', function () {
			sockets._on_message(null, name, message);
			expect(fake_io.sockets.emit.args[0][1].event).to.not.be.ok();
		});

	});

	describe('on_disconnect', function () {

		it('should call console.error on error', function () {
			sockets._on_disconnect({});
			expect(console.error.calledOnce).to.be(true);
		});

		it('should not emit on an error', function () {
			sockets._on_disconnect({});
			expect(fake_io.sockets.emit.called).to.be(false);
		});

		it('should emit on success', function () {
			sockets._on_disconnect(null, name);
			expect(fake_io.sockets.emit.calledWith('text')).to.be(true);
		});

		it('should emit an event flag on success', function () {
			sockets._on_disconnect(null, name);
			// second argument
			expect(fake_io.sockets.emit.args[0][1].event).to.be(true);
		});
	});

});