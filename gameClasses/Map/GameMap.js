var GameMap = IgeTileMap2d.extend({
	classId: 'GameMap',	

	init: function() {
		IgeTileMap2d.prototype.init.call(this);

		var self = this;

		ige.input.on('mouseDown', function () { self.mouseDown(); });

		//Setup click handlers for item selections
		$('#infostand').on('click', function() { self.itemDelete(); });
	},

	mouseDown: function() {
		
	},

	itemDelete: function() {
		if(typeof ige.selected == 'undefined')
			return;

		console.log(ige.selected);
		ige.selected.destroy();
	}
});