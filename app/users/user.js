var db = require('../util/database');
var HashMap = require('hashmap');
var crypt = require('../auth/crypt');

//var pool = db.getPool();

var userCache = new HashMap();


// This is for debug purpose
var printUserCache = function() {
	console.log("Printing userCache...");
	userCache.forEach((value, key) => {
		console.log(key + " => " + value);
	});
}
	
module.exports = {
	
	initialize : function (callback) {
		var query = "select * from users  where status='ENABLED'";
		var users;
		db.executeQuery(query, (rows, error) => {
			if (rows === null) {
               callback(null, error);
			}
			else {
				Object.keys(rows).forEach(key => {
				   var u = rows[key];
				   userCache.set(u.uid, u);
			   });
			   users = JSON.stringify(rows);
			   var reqbody = new Object();
			   reqbody.uid = "admin";
	           reqbody.passwd = "admin";
		       reqbody.firstName = "admin";
			   reqbody.lastName = "admin";
		       reqbody.userType = "admin";
			   reqbody.comments = "admin";
			   this.newUser(reqbody, (resp) => {
				    if (resp == null) {
					   console.log("Inserted admin user\n");
				    }
			   });
		
	          console.log('Users = ' + users);
			  callback(users);
			}
		});
	},
	
	
	getPassword : function(uid, callback) {
		if(userCache.has(uid) == false) {
			callback(null);
		}
		else {
			callback(userCache.get(uid).passwd);
		}
	},
	
	newUser : function(reqbody, callback) {
		printUserCache();
           console.log("Checking for User " + reqbody.uid + " already exist or not");
		   console.log("reqbody = " + JSON.stringify(reqbody));
           if(userCache.has(reqbody.uid) == false) {
	            console.log("User " + reqbody.uid + " not found. Creating new");
				crypt.encryptPassword(reqbody.passwd, (encpasswd) => {
				   let user = {
					   first_name : reqbody.firstName,
					   middle_name : reqbody.middleName,
					   last_name : reqbody.lastName,
					   uid : reqbody.uid,
					   passwd : encpasswd,
					   status : 'ENABLED',
					   user_type : reqbody.userType,
					   comments : reqbody.comments
				   };
				   var query = 'insert into users set ?';
				   db.executeInsert(query, user, (id, err) => {
					   if(err) {
				   		  callback(err);
					   }
		               else {
			               // Save to cache too
                           userCache.set(reqbody.uid, user);
			               callback(null);
		               }
				   });
				   
			   });
           }
           else {
	          console.log("User " + reqbody.uid + " already exist");
	          callback("User " + reqbody.uid + " already exist");
           }

	}
}