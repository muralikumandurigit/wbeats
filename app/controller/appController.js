var db = require('../util/database');
var pool = db.getPool();

module.exports = {
	getAllStudents : function () {
		var query = 'select * from students';
		var students;
		pool.getConnection((err, connection) => {
			if (err) {
				console.log('Not able to connect to db. error = ' + err);
			}
			else {
				console.log('Able to connect to db successfully...' + connection);
			}
			connection.query(query, (err, rows, fields) => {
				if(!err) {
					console.log('Queried successfully and returned rows are ' + rows);
//					console.log(rows);
//					console.log(fields);
//                    db.convertRowsToObj(rows, fields);
                    students = JSON.stringify(rows);
				}
				else {
					console.log('Query failed with error ' + err);
				}
				connection.release;
			})
		});
		return students;
	}
}