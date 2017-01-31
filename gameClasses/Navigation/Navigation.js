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
				//Hide main menu screen if it's visible
				$('#entry').hide();

				//Show the menu bar
				$('.bottom-bar').show();
				$('#navigation_close').show();

				//Show loading screen

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

				//Set a timeout to hide the loading screen
			})
    	});

    	return this;
    },

    showMainMenu: function() {
    	this.closeAllUI();

    	ige.room._gameScene.hide();
		ige.removeGraph();
		
		$('#entry').show();
		toggle_popup('#navigation-ui');

		return this;
    },

    closeAllUI: function() {
    	$('.bottom-bar').hide();
    	$('#navigation_close').hide();
    	close_inventory_ui();
    },
}