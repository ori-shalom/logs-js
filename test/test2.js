const logsJs = require('../logs-js');

console.log('test regular logging with no log level');
console.log('test TRACE', logsJs.TRACE);
console.log('test DEBUG', logsJs.DEBUG);
console.log('test INFO', logsJs.INFO);
console.log('test WARN', logsJs.WARN);
console.log('test ERROR', logsJs.ERROR);
console.log('test FATAL', logsJs.FATAL);