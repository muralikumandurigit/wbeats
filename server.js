require('./app/util/global');
require('./app/rest/rest');
var app = global.app;

const props = require('./app/util/props.js');
var port = props.getProperty('prod.server.port');
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
