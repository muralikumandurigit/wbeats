var db = require('../util/database');
var pool = db.getPool();

module.exports = {
	getAllStudents : function (callback) {
		var query = 'select * from students';
		var students;
		db.executeQuery('select * from students', (rows) => {
			students = JSON.stringify(rows);
			callback(students);
		});
	}
}