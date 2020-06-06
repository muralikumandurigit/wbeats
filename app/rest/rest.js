
var bodyParser = require('body-parser');
var students = require('../controller/students');
var user = require('../users/user');
const authService = require('../auth/auth');

var jsonParser = bodyParser.json();

var app = global.app;
var express = global.express;
const  ProtectedRouter = express.Router();
console.log("Created ProtectedRouter");


var sendResponse = function(res, data) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.send(data);
}


	   // Use authenticated routes
       console.log("Using ProtectedRouter for /school");
       app.use('/school', ProtectedRouter);
//       app.use(jwt());

	   ProtectedRouter.use((req, res, next) => {
		
	      // check header for the token
          console.log("Verifying token...");
          var token = req.headers['access-token'];
          if(token) {
             authService.verifyToken(req, token, (err) => {
	            if(err) {
		           console.log("Invalid Token. Throwing 401");
                   res.status(401);
//                   err = new Error(401);
                   err = new Error("Invalid Token");
//                   err.http_code = 401;
//                   err.message = "Invalid Token";
		           sendResponse(res, err);
	            }
                else {
	               console.log("Valid Token");
		           next();
                }   
             });
          }
          else {
	         console.log("Token Missing. Hence throwing 401.");
	         res.status(401);
             err = new Error(401);
             err.message = "Token Missing";
             sendResponse(res, err);
          }

       });




ProtectedRouter.get('/students', (req, res) => {
	console.log('Request came to students...');
    students.getAllStudents((students) => {
	console.log(students);
	sendResponse(res, students);
   });
});

ProtectedRouter.post('/student/register', (req, res) => {
	console.log("Received request for post");
	students.newStudent(req.body, (studentId) => {
		sendResponse(res, "New Student saved successfully with student id : " + studentId);
	});;
});


app.post('/login', jsonParser, (req, res, next) => {
	console.log("body JSON = " + JSON.stringify(req.body));
	authService.authenticate(req.body, (token) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
	if(token == null) {
		res.status(401).json({ message: 'Username or password is incorrect' });
	}
	else {
		res.json(token);
	}
	});
});

ProtectedRouter.post('/user/new', (req, res) => {
	console.log("New user create request received");
	user.newUser(req.body, (err) => {
		if(!err) {
			console.log("user created successfully");
		   sendResponse(res, "user created successfully");
		}
		else {
		   console.log("user created failed with error: " + err);
		   res.status(403);
		   sendResponse(res, "user created failed with error: " + err);
		}
	});
});
