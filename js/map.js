
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
					console.log(`Geocode was not successful for the following reason: ${status}`);
				}
		    });
		},
		displayMap: function() {
			this.map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: this.lat, lng: this.lng},
				scrollwheel: false,
				zoom: 13
			});

			var marker = new google.maps.Marker({
				position: {lat: this.lat, lng: this.lng},
				map: this.map,
				title: 'Your Position'
			});

	        var bikeLayer = new google.maps.BicyclingLayer();
		        bikeLayer.setMap(this.map);
			}
	}

	$('#zipCode').on('click', function() {
		mapObj.zipCode = $('#user-input').val();
		console.log('zip: ', mapObj.zipCode);
		mapObj.initMap();
	});
});