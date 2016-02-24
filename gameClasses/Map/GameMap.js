var GameMap = IgeTileMap2d.extend({
	classId: 'GameMap',	

	init: function() {
		IgeTileMap2d.prototype.init.call(this);

		var self = this;

		ige.input.on('mouseDown', function () { self.mouseDown(); });
	},

	mouseDown: function() {
		
	}
});