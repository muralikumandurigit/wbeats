var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('./config/prod.properties');

console.log("Reading prod.properties file");

var getProperty = function(propName) {
	return process.env.PORT || properties.get(propName);
}

console.log("myql server = " + getProperty('prod.db.mysql.server'));
console.log("myql username = " + getProperty('prod.db.mysql.username'));
console.log("myql password = " + getProperty('prod.db.mysql.password'));
console.log("myql database = " + getProperty('prod.db.mysql.database'));
console.log("myql port = " + getProperty('prod.db.mysql.port'));
console.log("midtier port = " + getProperty('prod.server.port'));

module.exports.getProperty = getProperty;