var db = require('util/database');
var pool = db.getPool();
const props = require('/app/util/props.js');
var express = require('express'),
app = express(),
port = process.env.PORT || props.getProperty('prod.server.port');
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);


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