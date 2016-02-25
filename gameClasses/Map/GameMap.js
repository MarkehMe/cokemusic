var GameMap = IgeTileMap2d.extend({
	classId: 'GameMap',	

	init: function() {
		IgeTileMap2d.prototype.init.call(this);

		var self = this;

		self._mouseEventsActive = true;
		self._mouseMove = function(x, y) {
			self.mouseMove(x, y);
		};

		ige.input.on('mouseDown', function (x, y) { self.mouseDown(x, y); });
		//ige.input.on('mouseOver', function (x, y) { self.mouseOver(x, y); });

		//Setup click handlers for item selections
		$('#itemDelete').on('click', function() { self.itemDelete(); });
		$('#itemPickup').on('click', function() { self.itemPickup(); });
		$('#itemRotate').on('click', function() { self.itemRotate(); });
		$('#itemMove').on('click', function() { self.itemMove(); });
	},

	mouseDown: function(x, y) {
		if(ige.movingItem == true) {
			var tile = this.mouseToTile();
			ige.selected.moveTo(tile.x, tile.y);
			ige.movingItem = false;
		}
	},

	mouseMove: function(mouseX, mouseY) {
		if(ige.movingItem == true) {
			var tile = this.mouseToTile();
			//if (!ige.$('tileMap1').map.collision(tile.x, tile.y, 45, 45)) {
			if(!ige.client.itemAt(tile.x, tile.y)) {
				ige.selected.translateToTile(tile.x, tile.y, 0);
			}
		}
	},

	itemDelete: function() {
		if(typeof ige.selected == 'undefined')
			return;

		ige.selected.destroy();
	},

	itemPickup: function() {

	},

	itemRotate: function() {

	},

	itemMove: function() {
		ige.movingItem = true;
	},
});