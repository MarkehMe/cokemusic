var GameMap = IgeTileMap2d.extend({
	classId: 'GameMap',

	init: function() {
		IgeTileMap2d.prototype.init.call(this);

		var self = this;

		self._mouseEventsActive = true;
		self._mouseMove = function(x, y) {
			self.mouseMove(x, y);
		};

		ige.input.on('mouseUp', function (x, y) { self.mouseUp(x, y); });
		//ige.input.on('mouseOver', function (x, y) { self.mouseOver(x, y); });

		//Setup click handlers for item selections
		$('#itemDelete').on('click', function() { self.itemDelete(); });
		$('#itemPickup').on('click', function() { self.itemPickup(); });
		$('#itemRotate').on('click', function() { self.itemRotate(); });
		$('#itemMove').on('click', function() { self.itemMove(); });

		$('.bottom-bar').show();

		//Setup click handlers for item selections in bag
		$('body').on('click', '.inventory-data a', function() { self.itemInventoryClick( $(this)); });
	},

	mouseUp: function(x, y) {
		if(ige.movingItem == true) {
			ige.movingItem = false;

			var tile = this.mouseToTile(),
				transformX = tile.x,
				transformY = tile.y;

			if ( ! ige.$('tileMap1').isTileOccupied (transformX, transformY)) {
				// If its not occupied, move to it
				ige.selected.moveTo(transformX, transformY);
			} else {
				// it's occupied - move back to original spot
				ige.selected.moveTo();
			}
		}
	},

	mouseMove: function(mouseX, mouseY) {
		if(ige.movingItem == true) {
			var tile = this.mouseToTile(),
				transformX = tile.x,
				transformY = tile.y;

			if(ige.selected.data('tileYHeight') >= 2) {
				var objectHeight = ige.selected.data('tileYHeight');
				transformY += 1 / objectHeight;
			} else if(ige.selected.data('tileXWidth') >= 2) {
				var objectWidth = ige.selected.data('tileXWidth');
				transformX += 1 / objectWidth;
			}

			if(!ige.client.itemAt(transformX, transformY)) {
				ige.selected.translateToTile(transformX, transformY, 0);
			}
		}
	},

	strokeTile: function(x, y) {
		var tile = [ { 'x': x, 'y' : y } ];
		this.highlightTile(tile);
	},

	clearStrokes: function() {
		this.highlightTile([]);
	},

	itemDelete: function() {
		if(typeof ige.selected == 'undefined')
			return;

		ige.selected.destroy();
	},

	/**
	 * Called whenever the user click the pickup button for selected object
	 */
	itemPickup: function() {
		if(ige.selected === undefined)
			return false;

		//Add the item to inventory
		//TODO: this needs a lot of improvements. Right now we are just adding to page 1
		//		but we need to create a method to add to the last page / create new page
		//		if the last is full etc.
		$('<li><a data-item="'+ige.selected.data('gameItem')+'"><img src="'+ige.selected.data('icon')+'"></a></li>').
		appendTo('.inventory-data > li > .items');

		//Destory the actual game item.
		ige.selected.destroy();
	},

	itemRotate: function() {
		ige.selected.rotate();
	},

	itemMove: function() {
		this.clearStrokes();
		ige.movingItem = true;
	},

	/**
	 * Called whenever an item is selected from the inventory bag
	 * @param {*} The jQuery caller object (anchor tag)
	 */
	itemInventoryClick: function(caller) {
		if(caller === undefined)
			return false;

		//Check and make sure the item data actually has data.
		var itemName = caller.data('item');
		if(itemName === undefined || itemName == '')
			return false;;

		//Make sure this item exsists in the the preloaded furni data.
		if(!this.itemExistsInData(itemName))
			return false;

		var mousePos = this.mouseToTile(),
		//TODO: instead of placing the item at the mouse position
		//		we need to create a new function to get the closest
		//		avalible position to temporaliy store this item incase
		//		the client gets dc'ed, etc
			newItem = new GameItem(itemName, 'SE', mousePos.x, mousePos.y);

		//Remove the li elements so all the other items get adjusted
		//TODO: eventually when we incorporate the server we should just 
		//query for an updated inventory object instead of just removing.
		caller.parent().remove();

		//Set the selected item as the newly created one from inventory
		ige.selected = newItem;
		ige.movingItem = true
	},

	itemExistsInData: function(item) {
		if(FURNITURE[item] === undefined)
			return false
		return true;
	},
	
	/* Gets the total wall offset that will be used to calculate each individual 
	 * wall section placement on the x offset.
	 * @return { int }
	 */
	wallXOffset: function() {
		return (((this._gridSize.x - 1) * this._tileWidth) + (this._tileWidth / 2));
	},

	wallYOffset: function() {
		return ((this._tileWidth / (this._gridSize.y - 1) * this._gridSize.y));
	}
});
