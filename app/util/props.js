var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('./config/prod.properties');

var getProperty = function(propName) {
	return process.env.PORT || properties.get(propName);
}

module.exports.getProperty = getProperty;