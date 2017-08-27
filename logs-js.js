const d = require('print-colors').fg.d;
const l = require('print-colors').fg.l;
const bg = require('print-colors').bg;
const e = require('print-colors').e;
const b = '\033[1m'; //Bold
const levelLength = 5;
const fileLength = 24;
const oldLog = console.log;
Error.stackTraceLimit = Infinity;

class LogLevel {
	constructor (level, color, name) {
		this.level = level;
		this.color = color;
		this.name = name;
	}
}
const logLevels = {
	ALL: new LogLevel(0, '', 'ALL'),
	TRACE: new LogLevel(1, d.green, 'TRACE'),
	DEBUG: new LogLevel(2, l.green, 'DEBUG'),
	INFO: new LogLevel(3, l.cyan, 'INFO'),
	WARN: new LogLevel(4, l.yellow, 'WARN'),
	ERROR: new LogLevel(5, l.red, 'ERROR'),
	FATAL: new LogLevel( 6, bg.d.red+l.white, 'FATAL'),
	OFF: new LogLevel( 7, '', 'OFF')
}
for (var name in logLevels) { exports[name] = logLevels[name] }

let defaultLogLevel;
let conf = { // Default configuration
	"*": "ALL"
};

let findFileLogLevel = (parentLevel, filePathArray, conf) => {
	if (conf['*'] && typeof conf['*'] === "string" && logLevels[conf['*']] && logLevels[conf['*']] instanceof LogLevel) {
		parentLevel = logLevels[conf['*']];
	}
	if (filePathArray.length > 0 && conf[filePathArray[0]]) {
		if (typeof conf[filePathArray[0]] === "string" && logLevels[conf[filePathArray[0]]] && logLevels[conf[filePathArray[0]]] instanceof LogLevel) {
			return logLevels[conf[filePathArray[0]]];
		} else if (typeof conf[filePathArray[0]] === "object") {
			conf = conf[filePathArray[0]];
			filePathArray.shift()
			return findFileLogLevel(parentLevel, filePathArray, conf);
		}
	}
	return parentLevel;
}

let printIfAllowed = (logLevel, argumentsArray) => {
	let stackLines = new Error().stack.split('\n');
	let reg = /^(.*\\logs-js\.js:[0-9]+:[0-9]+\).*|Error)$/;
	let stackLine;
	while (reg.test(stackLine = stackLines.shift())) { }
	let location = stackLine.substring(stackLine.lastIndexOf('(') + 1, stackLine.length).replace(require.main.filename.substring(0, require.main.filename.lastIndexOf('\\')) + '\\' , '').split(":");
	let file = location[0];
	let allowedLogLevel = findFileLogLevel(logLevels.OFF, file.split('\\'), conf);
	if (allowedLogLevel.level !== 7 && allowedLogLevel.level <= logLevel.level && logLevel.level != 7) {
		let line = location[1];
		let print = l.gray+'['+e+logLevel.color+pad(logLevel.name, levelLength)+e+l.gray+'] - '+e+
			new Date().toISOString().replace(/T/, ' ').replace(/Z.*$/, '').replace(/-/g, d.red+'-'+e).replace(/:/g, d.red+':'+e).replace('.', d.red+'.'+e+d.cyan)+e+
			l.gray+' - ['+e+d.red+'/'+e+file.replace('.',d.red+'.'+e).replace(/\\/g,d.red+'/'+e)+d.red+':'+e+d.cyan+line+e+l.gray+']:'+e+l.white;
		if (argumentsArray.length > 0) {
			argumentsArray[0] = print + ' ' + argumentsArray[0];
		} else {
			argumentsArray.unshift(print)
		}
		oldLog.apply(null, argumentsArray);
	}
}

let pad = (str, length) => {
	let pad = Array(length + 1).join(' ');
	if (typeof str === 'undefined') 
		return pad;
	return (str + pad).substring(0, pad.length);
}

let log = exports.log = (...args) => {
	if ((args.length > 0 && args[args.length - 1] instanceof LogLevel)) {
		printIfAllowed(args.pop(), args);
	} else if (defaultLogLevel) {
		printIfAllowed(defaultLogLevel, args);
	} else {
		oldLog.apply(null, args);
	}
};
exports.trace = (...args) => { log.apply(null, args.concat(logLevels.TRACE)); };
exports.debug = (...args) => { log.apply(null, args.concat(logLevels.DEBUG)); };
exports.info = (...args) => { log.apply(null, args.concat(logLevels.INFO)); };
exports.warn = (...args) => { log.apply(null, args.concat(logLevels.WARN)); };
exports.error = (...args) => { log.apply(null, args.concat(logLevels.ERROR)); };
exports.fatal = (...args) => { log.apply(null, args.concat(logLevels.FATAL)); };

exports.loadConfig = (config) => {
	if (config.log && typeof config.log === 'object') {
		conf = config.log;
	}
	if (logLevels[config.defaultLogLevel] && logLevels[config.defaultLogLevel] instanceof LogLevel) {
		defaultLogLevel = logLevels[config.defaultLogLevel];
	}
	if (config.useConsoleLog && config.useConsoleLog===true) {
		console.log = log;
	}
}