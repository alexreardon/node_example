var request = require('request'),
	format = require('util').format,
	city = 'sydney',
	country_code = 'AUS',
	timeout,
	url = format('http://api.openweathermap.org/data/2.1/find/name?q=%s,%20%s&units=metric', city, country_code);

function start () {
	timeout = setTimeout(function () {
		get_temp();
	}, 2000);
}

function get_temp () {
	request({url: url, json: true}, function (error, response, body) {
		if (error || !response || response.statusCode !== 200) {
			return console.error(response ? response.statusCode : 'XXX', error);
		}

		// sanity check data
		if (!body.list || !body.list.length || !body.list[0].main || !body.list[0].main.temp) {
			return console.error('body did not contain temperature', format('%j', body));
		}

		var temp = body.list[0].main.temp;

		console.log(format('%d C', temp.toFixed(2)));
	});

	// won't wait for request
	start();
}

console.log('current temperature in sydney:');
get_temp();