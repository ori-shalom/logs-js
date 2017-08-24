const d = require('print-colors').fg.d;
const l = require('print-colors').fg.l;
const bg = require('print-colors').bg;
const e = require('print-colors').e;
const b = '\033[1m';

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
for (var name in logLevels) {
	if (logLevels.hasOwnProperty(name)) {
		exports[name] = logLevels[name]
	}
}

const levelLength = 5;
const fileLength = 24;
let defaultLogLevel;
let conf = {
	"*": "ALL"
};

exports.loadConfig = (confFile) => {
	let config = require(confFile);
	if (config.log && typeof config.log === 'object') {
		conf = config.log;
	}
	if (logLevels[config.defaultLogLevel] && logLevels[config.defaultLogLevel] instanceof LogLevel) {
		defaultLogLevel = logLevels[config.defaultLogLevel];
	}
}

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
	let stackLine = new Error().stack.split('\n')[3];
	let location = stackLine.substring(stackLine.lastIndexOf('(') + 1, stackLine.length).replace(__dirname + '\\' , '').split(":");
	let file = location[0];
	let path = file.split('\\', );
	let allowedLogLevel = findFileLogLevel(logLevels.OFF, path, conf);

	if (allowedLogLevel.level !== 7 && allowedLogLevel.level <= logLevel.level && logLevel.level != 7) {
		let line = location[1];
		argumentsArray[0] = l.gray+'['+e+logLevel.color+pad(logLevel.name, levelLength)+e+l.gray+'] - '+e+
			d.cyan+new Date().toISOString().replace(/T/, ' ').replace(/Z.*$/, '').replace(/-/g, d.yellow+'-'+d.cyan).replace(/:/g, d.yellow+':'+d.cyan).replace('.', d.yellow+'.'+d.cyan)+e+
			l.gray+' - ['+e+pad(file+':',fileLength-(''+line).length).replace('.',d.yellow+'.'+e)+d.cyan+line+e+l.gray+']: '+e+argumentsArray[0];
		oldLog.apply(null, argumentsArray);
	}
}

let oldLog = console.log;
console.log = function(){
	if ((arguments.length > 0 && arguments[arguments.length - 1] instanceof LogLevel)) {
		let logLevel = Array.prototype.pop.apply(arguments);
		printIfAllowed(logLevel, arguments);
	} else if (defaultLogLevel) {
		printIfAllowed(defaultLogLevel, arguments);
	} else {
		oldLog.apply(null, arguments);
	}
}

function pad(str, length) {
	let pad = Array(length + 1).join(' ');
	if (typeof str === 'undefined') 
		return pad;
	//return (pad + str).slice(-pad.length - 1);
	return (str + pad).substring(0, pad.length);
}


