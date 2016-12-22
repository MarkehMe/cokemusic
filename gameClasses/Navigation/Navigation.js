var Navigation = {
    init: function() {
    	$('.nav-name, .nav-go').on('click', function() { 
	    	var listItem = $(this).parent();
			var studioId = $(listItem).data('room-id');

			//TODO: SERVER
			$.ajax({
				dataType: "json",
				method: "POST",
				url: "/jsonreply/room.php",
				data: { id: studioId },
			})
			.success(function(data) {
					ige.removeGraph();
					
					ige.addGraph('IgeBaseScene');

					var playerStudio = new PlayerStudio()
						.type(data.room_type)
						.owner(data.room_owner)
						.render();

					ige.room = playerStudio;

					// Create the 3d container that the player
					// entity will be mounted to
					ige.player = new Character()
						.id('player')
						.setStyle('001')
						.setHeadStyle('001')
						.setHairStyle('008')
						.setEyeStyle('001')
						.setMouthStyle('001')
						.setLeftSleveStyle('001')
						.setRightSleveStyle('001')
						.setShirtStyle('001')
						.setPantStyle('001')
						.setShoeStyle('001')
						.startPlayer();

			})
			.complete(function(data) {
				// var json = jQuery.parseJSON( data.responseText );
				// console.log(json)
			});
    	});
    }
}

Navigation.init();