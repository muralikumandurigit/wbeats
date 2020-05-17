var mysql = require('mysql');
const props = require('../util/props.js');
var pool;
module.exports = {
    getPool: function () {
        if (pool) return pool;

	    var dbserver = props.getProperty('prod.db.mysql.server');
        var dbuser = props.getProperty('prod.db.mysql.username');
        var dbpassword = props.getProperty('prod.db.mysql.password');
        var dbdatabase = props.getProperty('prod.db.mysql.database');
        var dbport = props.getProperty('prod.db.mysql.port');

        console.log("dbuser = " +dbuser);
        console.log("dbserver = " +dbserver);
        console.log("dbpassword = " +dbpassword);
        console.log("dbdatabase = " +dbdatabase);
        console.log("dbport = " +dbport);
        pool = mysql.createPool({
            host: dbserver,
            user: dbuser,
            password: dbpassword,
            database: dbdatabase,
            port : dbport
        });
        console.log('Created db pool successfully...');
        return pool;
    },

    executeQuery: function (query, callback) {
        this.getPool().getConnection((err, connection) => {
			if (err) {
				console.log('Not able to connect to db. error = ' + err);
				callback(null, err);
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
				callback(-1, err);
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