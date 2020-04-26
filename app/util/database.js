var mysql = require('mysql');
var pool;
module.exports = {
    getPool: function () {
        if (pool) return pool;
        pool = mysql.createPool({
            host: '13.233.76.25',
            user: 'wbeats',
            password: 'wbeats',
            database: 'wbeats',
            port : '3306'
        });
        console.log('Created db pool successfully...');
        return pool;
    },

    executeQuery: function (query, callback) {
        this.getPool().getConnection((err, connection) => {
			if (err) {
				console.log('Not able to connect to db. error = ' + err);
			}
			else {
				console.log('Able to connect to db successfully...' + connection);
			}
			connection.query(query, (err, rows, fields) => {
				if(!err) {
					console.log('Queried successfully and returned rows are ' + rows);
//                    students = JSON.stringify(rows);
                    callback(rows);
				}
				else {
					console.log('Query failed with error ' + err);
				}
				connection.release;
			});
		});
    },

    executeInsert: function (query, values, callback) {
        this.getPool().getConnection((err, connection) => {
            if (err) {
				console.log('Not able to connect to db. error = ' + err);
			}
			else {
				console.log('Able to connect to db successfully...' + connection);
            }
            connection.query(query, values, (err, result) => {
				if(!err) {
					console.log('Inserted successfully');
                    callback(result.insertId);
				}
				else {
					console.log('Insert failed with error ' + err);
					callback(-1, err);
				}
				connection.release;
			});
        });
    },

// Not being used currently
    convertRowsToObj: function (rows, fields) {
       var objs = [];
       for (let i of rows) {
	       for(let j of fields) {
//			  objs.push({username: rows[i].username});
	          console.log(j.name);
	       }
       }
       return objs;
    }
};