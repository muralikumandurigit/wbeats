const bcrypt = require('bcrypt');

module.exports = {
  encryptPassword : function(passwd, callback) {
	bcrypt.hash(passwd, 10, (err, hash) => {
		callback(hash);
	});
  },

  comparePassword : function (userentered, encrypted, callback) {
	bcrypt.compare(userentered, encrypted, (err, isMatch) => {
		if(err) {
			console.log("Error occurred while validating password");
			callback(false);
		}
		else if(!isMatch) {
			// Password incorrect
			callback(false);
		}
		else {
			// Password matched
			callback(true);
		}
		
	});
  }
}