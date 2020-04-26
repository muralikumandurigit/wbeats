require('./app/util/global');
require('./app/rest/rest');
var init = require('./app/init/initializer');
const errorHandler = require('./app/err/err');
const jwt = require('./app/auth/jwt');
var app = global.app;
init.initialize();
const props = require('./app/util/props.js');
var port = props.getProperty('prod.server.port');
app.listen(port);
app.use(jwt());
app.use(errorHandler);
app.use(jwt());

console.log('todo list RESTful API server started on: ' + port);

