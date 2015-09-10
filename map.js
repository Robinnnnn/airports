var map;
var markers = [];
var geodesicPoly;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 39.09024,
			lng: -95.712891
		},
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.HYBRID
	});

	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	function clearMarkers() {
		setMapOnAll(null);
	}

	function clearPath() {
		geodesicPoly.setMap(null);
	}

	var firstMarker = false;

	$(".draw-marker").click(function(e) {
		e.preventDefault();

		var bounds = new google.maps.LatLngBounds();
		if (geodesicPoly) {
			clearPath();
		}
		clearMarkers();
		markers = [];
		var path = [];

		for (var key in coordinates) {
			var latLng = coordinates[key];
			if (latLng) {
				var marker = new google.maps.Marker({
					position: latLng,
					map: map,
					animation: google.maps.Animation.DROP
				});

				bounds.extend(new google.maps.LatLng(latLng.lat, latLng.lng));
				markers.push(marker);
				path.push({
					lat: latLng.lat,
					lng: latLng.lng
				});
			} else {
				firstMarker = false;
			}
		}
		map.fitBounds(bounds);

		geodesicPoly = new google.maps.Polyline({
			path: path,
			strokeColor: '#00ffc5',
			strokeOpacity: 1.0,
			strokeWeight: 1,
			geodesic: true,
			map: map
		});
		geodesicPoly.setMap(map);

		if (!firstMarker) {
			map.setZoom(4);
			firstMarker = true;
		}
	})
}