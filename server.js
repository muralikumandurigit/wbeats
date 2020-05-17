require('./app/util/global');
require('./app/rest/rest');
var init = require('./app/init/initializer');

// Initialize
init.initialize((err) => {
	if(err != null){
		console.log("Unable to initialize the program. Erroring out");
		process.exit(1);
	}
});


