var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('../config/prod.properties');

var getProperty = function(propName) {
	return properties.get(propName);
}

module.exports.getProperty = getProperty;