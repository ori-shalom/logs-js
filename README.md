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

## Use logs-js

Specify log level when printing to log:
```javascript
console.log('text', logsJs.WARN);
```

## Supported Log Levels
- TRACE
- DEBUG
- INFO
- WARN
- ERROR
- FATAL