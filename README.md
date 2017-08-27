# logs-js

logs-js is a very lightweight library for logging in node applications.

## Add logs-js to your project

Install logs-js with:
```
npm install logs-js
```

Import the module to your project:
```javascript
const logsJs = require('logs-js');
```

## Supported Log Levels
- TRACE
- DEBUG
- INFO
- WARN
- ERROR
- FATAL

## Use logs-js

Specify log level when printing to log:
```javascript
logsJs.log('text', logsJs.WARN);
```

Or use the shorthand:

```javascript
logsJs.trace('text');
logsJs.debug('text');
logsJs.info('text');
logsJs.warn('text');
logsJs.error('text');
logsJs.fatal('text');
```

## Configure logs-js

Load logging properties:
```javascript
const logsJs = require('logs-js');
logsJs.loadConfig({
    "log" : {
        "*": "ALL" // Print all log levels on all files to the console
    }
});
```

Or use external file:
```javascript
const logsJs = require('logs-js');
logsJs.loadConfig(require('./logs-conf.json'));
```

The config file should be in the following format:
```javascript
{
    "useConsoleLog": true, // override the console.log function with logs-js log function (false by default)
    "defaultLogLevel": "logLevel", // for when using logs-js log without specifing log level
    "log" : {
        "*": "logLevel", // global log level to be printted to the log
        "file-name" : "logLevel", // log level to be printted to the log for a specific file in the root folder
        "dir-name": "logLevel", // global log level to be printted to the log for a specific directory
        "dir-name": {
            "*": "logLevel", // another way to specify global log level to be printted to the log a specific directory
            "file-name" : "logLevel" // log level to be printted to the log for a specific file in a directory
        } 
    }
}
```

When choosing which level to print to the console you can use the supported log levels list above.
Notice higher log levels automatically include lower log levels.
For example setting the log level to `WARN` will also print to the log `ERROR` and `FATAL` **but won't print** to the log `INFO`, `DEBUG` and `TRACE`.
Also you can use `OFF` for turnning off logging completely or `ALL` for printing all log levels to the console.



