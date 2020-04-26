var students = require('../controller/students');
var user = require('../users/user');
const authService = require('../auth/auth');


var app = global.app;

var sendResponse = function(res, data) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(data);
}

app.get('/students', (req, res) => {
	console.log('Request came to students...');
    students.getAllStudents((students) => {
	console.log(students);
	sendResponse(res, students);
   });
});

app.post('/student/register', (req, res) => {
	console.log("Received request for post");
	students.newStudent(req.body, (studentId) => {
		sendResponse(res, "New Student saved successfully with student id : " + studentId);
	});;
});

app.post('/login', (req, res, next) => {
	authService.authenticate(req.body, (token) => {
	if(token == null) {
		res.status(401).json({ message: 'Username or password is incorrect' });
	}
	else {
		res.json(token);
	}
	});

/*	authService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err)); */
});

app.post('/user/new', (req, res) => {
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
