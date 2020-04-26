const config = require('../../config/config.json');
const jwt = require('jsonwebtoken');
var users = require('../users/user');
var crypt = require('./crypt');
//const users = [{ id: 1, username: 'murali', password: 'murali', firstName: 'Test', lastName: 'User' }];


module.exports = {
    authenticate,
    getAll
};

 function authenticate(reqbody, callback) {
	users.getPassword(reqbody.uid, (encPasswd) => {
		if(encPasswd == null) {
			console.log("null password from cache");
			return null;
		}
		else {
			crypt.comparePassword(reqbody.passwd, encPasswd, (isMatched) => {
				if(!isMatched){
					console.log("Passwords doesn't match");
					callback(null);
				}
				else {
					console.log("Passwords matched");
				        callback(jwt.sign({ sub: reqbody.uid }, 
                               config.secret, 
                               {expiresIn: 86400 // expires in 24 hours
                               }));
                }
			});
		}
	});
/*    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, 
                               config.secret, 
                               {expiresIn: 86400 // expires in 24 hours
                               });
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    } */
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}


