var allAirports = require('./allAirports').allAirports;

var usAirports = allAirports.filter(function(airport) {
	return airport.country === "United States"
})

module.exports = {
	usAirports: usAirports
}