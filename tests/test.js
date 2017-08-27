const logsJs = require('logs-js');
logsJs.loadConfig(require('./logs-conf.json'));

require('./directory/test2.js');
require('./directory/nested_directory/test3.js');

console.time('test console.time');
console.timeEnd('test console.time');

console.log('%s def', 'abc');
console.log();
logsJs.trace();
logsJs.trace('test TRACE with trace() function');
logsJs.debug('test DEBUG with debug() function');
logsJs.info('test INFO with info() function');
logsJs.warn('test WARN with warn() function');
logsJs.error('test ERROR with error() function');
logsJs.fatal('test FATAL with fatal() function');
logsJs.log('test TRACE with log() function', logsJs.TRACE);
logsJs.log('test DEBUG with log() function', logsJs.DEBUG);
logsJs.log('test INFO with log() function', logsJs.INFO);
logsJs.log('test WARN with log() function', logsJs.WARN);
logsJs.log('test ERROR with log() function', logsJs.ERROR);
logsJs.log('test FATAL with log() function', logsJs.FATAL); 


console.log('test regular logging with console.log() and no log level');
console.log('test TRACE with console.log() function', logsJs.TRACE);
console.log('test DEBUG with console.log() function', logsJs.DEBUG);
console.log('test INFO with console.log() function', logsJs.INFO);
console.log('test WARN with console.log() function', logsJs.WARN);
console.log('test ERROR with console.log() function', logsJs.ERROR);
console.log('test FATAL with console.log() function', logsJs.FATAL); 

console.log('called from the root scope', logsJs.INFO);
console.log('called with multiple arguments', 'abc', 'def', 0, 1, 2, logsJs.INFO);
console.log({}, logsJs.INFO);
console.log(JSON.stringify({"msg":"object with some text printted with JSON.stringify()"},null,2), logsJs.INFO);
console.log([{}, 'abc', 3], logsJs.INFO);
(() => {
    console.log('called from anonymous function', logsJs.INFO);
})();

let c = () => {
    console.log('called from function c', logsJs.INFO);
}

function a(arg) {
    console.log(arg, logsJs.INFO);
    
    let b = () => {
        console.log('called from function b', logsJs.INFO);
    }
    b();
    c();
}
a('called from function a');
new a('called from constructor function a');

setTimeout(() => {
    console.log('called from timeout', logsJs.INFO);
}, 1000);

