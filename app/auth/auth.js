const config = require('../../config/config.json');
const jwt = require('jsonwebtoken');
var users = require('../users/user');
var crypt = require('./crypt');


module.exports = {
	verifyToken,
    authenticate,
    getAll
};

 function verifyToken(req, token, callback) {
     jwt.verify(token, config.secret, (err, decoded) => {
		 if(err) {
				callback(err);
	   	 }
		 else {
			req.decoded = decoded;
			callback();
		 }
	 });
 }

 async function authenticate(reqbody) {
	console.log("DEBUG: Authenticating : uid ="+reqbody.uid+"  passwd = "+reqbody.passwd);
	users.getPassword(reqbody.uid, (encPasswd) => {
		if(encPasswd == null) {
			console.log("null password from cache");
			return null;
		}
		else {
			crypt.comparePassword(reqbody.passwd, encPasswd, (isMatched) => {
				if(!isMatched){
					console.log("Passwords doesn't match");
					return null;
				}
				else {
					console.log("Passwords matched");
				        return jwt.sign({ sub: reqbody.uid }, 
                               config.secret, 
                               {expiresIn: 1 // expires in 24 hours
                               });
                }
			});
		}
	});
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}


