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
					//Restart the scene
					ige.removeGraph();
					ige.addGraph('IgeBaseScene');

					//Create the new studio
					var playerStudio = new PlayerStudio()
						.type(data.room_type)
						.owner(data.room_owner)
						.render();

					ige.room = playerStudio;

					//Recreate the player
					ige.player = new Character()
						.id('player')
						.setStyle('001')
						.setHeadStyle('001')
						.setHairStyle('013')
						.setEyeStyle('001')
						.setMouthStyle('001')
						.setLeftSleveStyle('001')
						.setRightSleveStyle('001')
						.setShirtStyle('001')
						.setPantStyle('001')
						.setShoeStyle('001')
						.startPlayer();

					// ige.player = new Character()
					// 	.id('player')
					// 	.setStyle('002')
					// 	.setHeadStyle('004')
					// 	.setHairStyle('006')
					// 	.setEyeStyle('001')
					// 	.setMouthStyle('001')
					// 	.setLeftSleveStyle('005')
					// 	.setRightSleveStyle('005')
					// 	.setShirtStyle('008')
					// 	.setPantStyle('001')
					// 	.setShoeStyle('001')
					// 	.startPlayer();

					//Show any items in the room
					

			})
			.complete(function(data) {
				// var json = jQuery.parseJSON( data.responseText );
				// console.log(json)
			});
    	});
    }
}

Navigation.init();