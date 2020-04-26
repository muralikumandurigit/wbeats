var user = require('../users/user');

module.exports = {
	initialize : function() {
		user.initialize(() => {});
	}
}
