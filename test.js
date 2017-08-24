const logsJs = require('./logs-js');


console.log('test regular logging with no log level');
console.log('test TRACE', logsJs.TRACE);
console.log('test DEBUG', logsJs.DEBUG);
console.log('test INFO', logsJs.INFO);
console.log('test WARN', logsJs.WARN);
console.log('test ERROR', logsJs.ERROR);
console.log('test FATAL', logsJs.FATAL); 

console.log('called from the root scope', logsJs.INFO);
console.log('called with multiple arguments', 'abc', 'def', 0, 1, 2, logsJs.INFO);
console.log({}, logsJs.INFO);
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

