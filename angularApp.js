var app = angular.module('AirportApp', []);

var coordinates = {
	from: null,
	destination: null
}

app.controller('AirportController', function(AirportFactory, $scope) {
	$scope.from;
	$scope.destination;
	$scope.distance;
	$scope.alert;

	AirportFactory.getAirports().then(function(airports) {
		$scope.airports = airports;
	})

	// prevents user from choosing the same airport twice
	function userChoseSameAirport(airport, fromOrTo) {
		return (fromOrTo === 'destination' && $scope.from && $scope.from.name === airport.name) || (fromOrTo === 'from' && $scope.destination && $scope.destination.name === airport.name);
	}

	function bothAirportsAreSelected() {
		return ($scope.from && $scope.destination);
	}

	function calculateDistance() {
		if (bothAirportsAreSelected()) {
			AirportFactory.calculateDistance($scope.from.code, $scope.destination.code)
				.then(function(distanceData) {
					var naut = (distanceData.distance.replace(',', '') * 0.868976).toFixed(2);
					$scope.distance = 'The distance between ' + $scope.from.name + ' and ' + $scope.destination.name + ' is ' + naut + ' nautical miles. Yowza!';
				});
		}
	}

	$scope.searchText = {};
	$scope.focused = {};

	$scope.selectAirport = function(airport, fromOrTo) {
		$scope.focused = {};
		$scope.searchText[fromOrTo] = airport.name;

		if (userChoseSameAirport(airport, fromOrTo)) {
			$scope.alert = 'Please choose a different airport!'
		} else {
			$scope.alert = null;
			$scope[fromOrTo] = airport;
			coordinates[fromOrTo] = {
				lat: airport.lat,
				lng: airport.lng
			}
		}

		calculateDistance();
	}

	$scope.focus = function(fromOrTo) {
		console.log('focusing', fromOrTo)
		$scope.focused[fromOrTo] = true;
	}
});