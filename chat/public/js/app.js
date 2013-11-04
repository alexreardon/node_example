var app = app || {};
app.views = {};

app.views.index = Backbone.View.extend({

	initialize: function () {
		// connect to server
		this.socket = io.connect(app.url);
		this.socket.on('text', this.on_socket_text.bind(this));

		// chat box
		this.$conversation_items = $('#conversation_items');

		this.$name_row = $('#name_row');
		this.$chat_row = $('#chat_row');
		this.$name_input = this.$name_row.find('input[type=text]');
		this.$chat_input = this.$chat_row.find('input[type=text]');

		// block form submission
		$('form[name=chat]').on('submit', function (event) {
			event.preventDefault();
			event.stopPropagation();
		});

		this.$name_input.one('change', this.on_name_input.bind(this));
		this.$chat_input.on('change', this.on_chat_input.bind(this));

		// set focus on name input
		this.$name_input.focus();

	},

	on_name_input: function () {
		// let the other clients know that a user has joined the chat
		this.socket.emit('join', this.$name_input.val());

		// update ui
		this.$name_row.addClass('hide');
		this.$chat_row.removeClass('hide');

		// set focus on chat input
		this.$chat_input.focus();

	},

	on_chat_input: function () {
		var val = this.$chat_input.val();
		console.log('chat input: ' + val);

		// send event to server
		this.socket.emit('message', val);

		// clear input field
		this.$chat_input.val('');

	},

	on_socket_text: function (data) {
		console.log(data);

		// this could be done with a handlebars template
		var text;

		// two different modes of display
		if (data.event) {
			text = '<p><strong>' + data.sender + ' ' + data.text + '</strong></p>';
		} else {
			text = '<p><strong>' + data.sender + '</strong>: ' + data.text + '</p>';
		}

		this.$conversation_items.append(text);

		// keep scroll box scrolled to bottom
		this.$conversation_items.scrollTop(this.$conversation_items[0].scrollHeight + 10);
	}

});

var index = new app.views.index();