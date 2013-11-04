var exec = require('child_process').exec;

// List a directory
exec('ls | grep --text ".js"', function (err, stdout, stderr) {
	console.log(stdout);
});