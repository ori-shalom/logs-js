const d = require('print-colors').fg.d;
const l = require('print-colors').fg.l;
const bg = require('print-colors').bg;
const e = require('print-colors').e;
const b = '\033[1m';
exports.ALL = new LogLevel(0, '', 'ALL');
exports.TRACE = new LogLevel(1, d.green, 'TRACE');
exports.DEBUG = new LogLevel(2, l.green, 'DEBUG');
exports.INFO = new LogLevel(3, l.cyan, 'INFO');
exports.WARN = new LogLevel(4, l.yellow, 'WARN');
exports.ERROR = new LogLevel(5, l.red, 'ERROR');
exports.FATAL = new LogLevel( 6, bg.d.red+l.white, 'FATAL');
exports.OFF = new LogLevel( 7, '', 'OFF');

const levelLength = 5;
const fileLength = 24;

function LogLevel(level, color, name) {
	this.level = level;
	this.color = color;
	this.name = name;
}
console.logLevel = exports.ALL;

let oldLog = console.log;
console.log = function(){
	if (!(console.logLevel.level === 7)){
		if (arguments.length > 0 && arguments[arguments.length - 1] instanceof LogLevel) {
			let logLevel = Array.prototype.pop.apply(arguments);
			if (console.logLevel.level <= logLevel.level && logLevel.level != 7) {
				let stackLine = new Error().stack.split('\n')[2];
				let location = stackLine.substring(stackLine.search(/(\\)(?!.*\\)/) + 1, stackLine.length).split(":");
				/* let stackLine = new Error().stack.split('\n')[2].trim().split(' ');
				let location1 = '';
				if (stackLine.length === 2) {
					location1 = stackLine[1].substring(stackLine[1].search(/(\\)(?!.*\\)/) + 1, stackLine[1].length).split(":");
				} else if (stackLine.length === 3) {
					location1 = stackLine[2].substring(stackLine[2].search(/(\\)(?!.*\\)/) + 1, stackLine[2].length - 1).split(":");
				} */
				let file = location[0];
				let line = location[1];
				arguments[0] = l.gray+'['+e+logLevel.color+pad(logLevel.name, levelLength)+e+l.gray+'] - '+e+
					d.cyan+new Date().toISOString().replace(/T/, ' ').replace(/Z.*$/, '').replace(/-/g, d.yellow+'-'+d.cyan).replace(/:/g, d.yellow+':'+d.cyan).replace('.', d.yellow+'.'+d.cyan)+e+
					l.gray+' - ['+e+pad(file+':',fileLength-(''+line).length).replace('.',d.yellow+'.'+e)+d.cyan+line+e+l.gray+']: '+e+arguments[0];
				oldLog.apply(null, arguments);
			}
		} else {
			//let stack = new Error().stack;
			//oldLog.apply(null, [stack]);
			oldLog.apply(null, arguments);
		}
	}
}

function pad(str, length) {
	let pad = Array(length + 1).join(' ');
	if (typeof str === 'undefined') 
		return pad;
	//return (pad + str).slice(-pad.length - 1);
	return (str + pad).substring(0, pad.length);
}


