
function initMap() {
}

$(document).ready(function() {
	var mapObj = {
		map: null,
		geocoder: null,
		zipCode: 0,
		lat: 0,
		lng: 0,
		initMap: function() {
			this.geocoder = new google.maps.Geocoder();
			this.geocoder.geocode( { 'address': this.zipCode}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {

					const address_components = results[0].address_components;
					var city = "";
					var state = "";

					for (var i = 0; i < address_components.length; i++) {
						if (address_components[i].types.indexOf('locality') != -1) {
							city = address_components[i].short_name;
						} else if(address_components[i].types.indexOf('administrative_area_level_1') != -1) {
							state = address_components[i].short_name;
						}
					}

					$('#location').text(`${city}, ${state}`);
					mapObj.lat = results[0].geometry.location.lat();
					mapObj.lng = results[0].geometry.location.lng();
					mapObj.displayMap();
				} else {
					console.error(`Geocode was not successful for the following reason: ${status}`);
				}
		    });
		},
		displayMap: function() {
			this.map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: this.lat, lng: this.lng},
				scrollwheel: false,
				zoom: 13
			});
		},
		addBikeLayer: function() {
	        const bikeLayer = new google.maps.BicyclingLayer();
	        bikeLayer.setMap(this.map);
		},
		addPools: function() {
		    const service = new google.maps.places.PlacesService(this.map);
	        service.nearbySearch({
				location: {lat: this.lat, lng: this.lng},
				radius: 5000,
				type: ['swimming pool']
	        }, function(results, status) {
				for (var i = 0; i < results.length; i++) {
					const message = `<div class="popup"><h1>${results[i].name}</h1><p>${results[i].vicinity}</p></center>`;
					mapObj.addMarker({
						lat: results[i].geometry.location.lat(),
						lng: results[i].geometry.location.lng()
					}, message);
				}
	        });
		},
		addMarker: function(coords, message) {
			const marker = new google.maps.Marker({
				position: {lat: coords.lat, lng: coords.lng},
				map: this.map,
			});

			const infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(this.map, marker);
            });
		}
	}

	$('#zipCode').on('click', function() {
		mapObj.zipCode = $('#user-input').val();
		mapObj.initMap();
	});

	$('#bike-trail, #running-path').on('click', function() {
		mapObj.addBikeLayer();
	});

	$('#open-swim, #indoor-swim').on('click', function() {
		mapObj.addPools();
	});
});