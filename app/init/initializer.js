var user = require('../users/user');
var bodyParser = require('body-parser');
const errorHandler = require('../err/err');
const props = require('../util/props.js');

//var restService = require('../rest/rest');

var app = global.app;

module.exports = {
	initialize : function(callback) {
		
		// User initialize
		user.initialize((users, error) => {
			if(users == null) {
				console.log("User cache initialization failed with error " + error);
				callback(error);
			}
			else {
			   console.log("User cache initialized successfully");
        // Initialize REST Service
//        restService.initialize(() => {
//	       console.log("REST Initialization completed");
//        });
        
              // Start error handling module
              app.use(errorHandler);
//app.use(cors());

//              app.use(bodyParser.json()); // support json encoded bodies
//              app.use(bodyParser.urlencoded({ extended: true })); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

              // Start Server
              var port = props.getProperty('prod.server.port');
              app.listen(port);

              console.log('todo list RESTful API server started on: ' + port);
			}
		});

	}
}
