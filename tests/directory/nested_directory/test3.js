const logsJs = require('logs-js');

logsJs.log('test3 regular logging with no log level');
logsJs.log('test3 TRACE', logsJs.TRACE);
logsJs.log('test3 DEBUG', logsJs.DEBUG);
logsJs.log('test3 INFO', logsJs.INFO);
logsJs.log('test3 WARN', logsJs.WARN);
logsJs.log('test3 ERROR', logsJs.ERROR);
logsJs.log('test3 FATAL', logsJs.FATAL);