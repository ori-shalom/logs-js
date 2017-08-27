const logsJs = require('logs-js');

logsJs.log('test2 regular logging with no log level');
logsJs.log('test2 TRACE', logsJs.TRACE);
logsJs.log('test2 DEBUG', logsJs.DEBUG);
logsJs.log('test2 INFO', logsJs.INFO);
logsJs.log('test2 WARN', logsJs.WARN);
logsJs.log('test2 ERROR', logsJs.ERROR);
logsJs.log('test2 FATAL', logsJs.FATAL);