var format = require('util').format;

// first arg = 'node'; second = filename
var args = process.argv.splice(2);

console.log(format('arguments: %j', args));