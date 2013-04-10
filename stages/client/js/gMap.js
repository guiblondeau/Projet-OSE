var map = null;  
	var latlng = new google.maps.LatLng(32.334167, -95.3);
	function initializeMap() {
		var myOptions = {
			zoom: 8,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		return new google.maps.Map($('#map-canvas')[0], myOptions);
	}

	$(document).ready(function() {
		$("#accordion").bind('accordionchange', function(event, ui) {
			console.log("coucou");
			//if (ui.newContent.attr('id') == 'accordion-group' && !map)
			//{
				map = initializeMap();
			//}
		});
	});