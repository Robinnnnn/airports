app.factory('AirportFactory', function($http) {
	return {
		getAirports: function() {
			return $http.get('/airports').then(function(airports) {
				return airports.data;
			})
		},
		calculateDistance: function(from, dest) {
			var cities = {
				from: from,
				dest: dest
			}

			return $http.post('/distance', cities).then(function(distance) {
				return distance.data;
			})
		}
	}
})