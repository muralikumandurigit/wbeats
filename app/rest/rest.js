var students = require('../controller/students');
var app = global.app;
app.get('/students', (req, res) => {
	console.log('Request came to students...');
//	res.send('I am from students');
    students.getAllStudents((students) => {
	console.log(students);
	res.send(students);
   });
});

app.post('/student/register', (req, res) => {
	res.send("Received request for post");
	console.log("Received request for post");
	console.log(req.body.name);
});

