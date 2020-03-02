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