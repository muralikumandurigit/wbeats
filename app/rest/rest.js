var students = require('../controller/students');
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

