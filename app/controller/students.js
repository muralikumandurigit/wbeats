var db = require('../util/database');
//var pool = db.getPool();

module.exports = {
	getAllStudents : function (callback) {
		var query = 'select * from students';
		var students;
		db.executeQuery(query, (rows) => {
			students = JSON.stringify(rows);
			callback(students);
		});
	},
	newStudent : function(reqbody, callback) {
		let student = {
			first_name : reqbody.firstName,
			middle_name : reqbody.middleName,
			last_name : reqbody.lastName,
			father_name: reqbody.fatherName,
			mother_name : reqbody.motherName,
			guardian_name : reqbody.guardianName,
			comments : reqbody.comments
		};
		var query = 'insert into students set ?';
		db.executeInsert(query, student, (studentId) => {
			callback(studentId);
		});
	}

}