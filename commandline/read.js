var format = require('util').format;

console.log('What do you want to say?');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {

    if (chunk && chunk.indexOf('bye') !== -1) {
        process.stdout.write('goodbye\r\n');
        return process.stdin.pause();
    }
    process.stdout.write(format('You said: %s', chunk));
});