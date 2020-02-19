var db = require('../util/mysql');
var pool = db.getPool();

module.exports = function(app, express) {
	var api = express.Router();
	
	api.get	('/students', () => {
		var query = 'select * from student_admissions';
		pool.getConnection((err, connection) => {
			connection.query(query, (err, rows) => {
				res.json({type : "success", code : 200, data : rows});
				connection.release;
			})
		});
	});
}