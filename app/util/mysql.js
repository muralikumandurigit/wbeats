var mysql = require('mysql');
var pool;
module.exports = {
    getPool: function () {
        if (pool) return pool;
        pool = mysql.createPool({
            host: '13.233.76.25',
            user: 'wbeats',
            password: 'wbeats',
            database: 'wbeats'
        });
        return pool;
    }
};