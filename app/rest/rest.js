var students = require('../controller/students');
var app = global.app;
app.get('/students', (req, res) => {
	console.log('Request came to students...');
    students.getAllStudents((students) => {
	console.log(students);
	res.send(students);
   });
});

app.post('/student/register', (req, res) => {
	console.log("Received request for post");
	students.newStudent(req.body, (studentId) => {
		res.send("New Student saved successfully with student id : " + studentId);
	});;
});

