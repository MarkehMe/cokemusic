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
		this._inventoryListener = $('body').on('click', '.inventory-data a', function() { self.itemInventoryClick( $(this)); });
	},

	mouseUp: function(x, y) {
		if(ige.movingItem == true) {
			ige.movingItem = false;

			var tile = this.mouseToTile(),
				transformX = tile.x,
				transformY = tile.y,
				item = ige.client.itemAt(transformX, transformY, true);

			if ( ! this.isTileOccupied (transformX, transformY)) {
				// If its not occupied, move to it
				ige.selected.moveTo(transformX, transformY, 0);
			} else {
				if(ige.selected.isStackable() && item.isStackable()) {
					var displacement = this.getTileZHeight(transformX, transformY);
					ige.selected.moveTo(transformX, transformY, displacement);
				} else {
					// it's occupied - move back to original spot
					ige.selected.moveTo();
				}
			}
		}
	},

	mouseMove: function(mouseX, mouseY) {
		if(ige.movingItem == true) {
			var tile = this.mouseToTile(),
				transformX = tile.x,
				transformY = tile.y, 
				item = ige.client.itemAt(transformX, transformY, true);

				//For some weird reason when youare dragging an item around
				//it sometimes recongizes itself
				if(typeof item !== 'undefined' && item._id == ige.selected._id) {
					item = undefined;
				}

			if(ige.selected.data('tileYHeight') >= 2) {
				var objectHeight = ige.selected.data('tileYHeight');
				transformY += 1 / objectHeight;
			} else if(ige.selected.data('tileXWidth') >= 2) {
				var objectWidth = ige.selected.data('tileXWidth');
				transformX += 1 / objectWidth;
			}

			//Check if it's stackable
			if(ige.selected.isStackable() == true && typeof item !== 'undefined' && item.isStackable() == true) {
				ige.selected.translateToTile(transformX, transformY, 0);
				ige.selected.translateBy(0,0,this.getTileZHeight(transformX, transformY));
			} else {
				if(!item) {
					ige.selected.translateToTile(transformX, transformY, 0);	
				}
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
		//Un-occupy the tile
		ige.selected.unplace();

		//Check if the item is being used
		if(ige.selected.beingUsed() == true) {
			var person = ige.selected.beingUsedBy();
			person.rest();
			ige.selected.beingUsed(false);
		}

		this.clearStrokes();
		ige.movingItem = true;
	},

	/**
	 * Called whenever an item is selected from the inventory bag
	 * @param {*} The jQuery caller object (anchor tag)
	 */
	itemInventoryClick: function(caller) {
		if(caller === undefined) {
			console.log('caller is undefined');
			return false;
		}

		//Check and make sure the item data actually has data.
		var itemName = caller.data('item');
		if(itemName === undefined || itemName == '') {
			console.log('could not find item data');
			return false;;
		}

		//Make sure this item exsists in the the preloaded furni data.
		if(!this.itemExistsInData(itemName)) {
			console.log('could not find item data. 1a');
			return false;
		}

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
	},

	/**
	 * Sets a tile or area as occupied by the passed obj parameter.
	 * Any previous occupy data on the specified tile or area will be
	 * overwritten.
	 * @param {Number} x X co-ordinate of the tile to un-occupy.
	 * @param {Number} y Y co-ordinate of the tile to un-occupy.
	 * @param {Number} width Number of tiles along the x-axis to occupy.
	 * @param {Number} height Number of tiles along the y-axis to occupy.
	 * @param {*} obj
	 * @return {*}
	 */
	occupyTile: function (x, y, width, height, obj) {
		var xi, yi;

		if (width === undefined) { width = 1; }
		if (height === undefined) { height = 1; }

		// Floor the values
		x = Math.floor(x);
		y = Math.floor(y);
		width = Math.floor(width);
		height = Math.floor(height);

		if (x !== undefined && y !== undefined) {
			for (xi = 0; xi < width; xi++) {
				for (yi = 0; yi < height; yi++) {
					var tileData = this.tileOccupiedBy(x + xi, y + yi);

					if(typeof tileData !== 'undefined') {
						var arr = [tileData, obj];
						this.map.tileData(x + xi, y + yi, arr);
					} else {
						this.map.tileData(x + xi, y + yi, obj);
					}
				}
			}

			// Create an IgeRect to represent the tiles this
			// entity has just occupied
			if (obj) {
				obj._occupiedRect = new IgeRect(x, y, width, height);
			}
		}
		return this;
	},

	/**
	 * Removes last data from the specified tile or area.
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number=} width
	 * @param {Number=} height
	 * @return {*}
	 */
	unOccupyTile: function (x, y, width, height) {
		var xi, yi, item;

		if (width === undefined) { width = 1; }
		if (height === undefined) { height = 1; }

		// Floor the values
		x = Math.floor(x);
		y = Math.floor(y);
		width = Math.floor(width);
		height = Math.floor(height);

		if (x !== undefined && y !== undefined) {
			for (xi = 0; xi < width; xi++) {
				for (yi = 0; yi < height; yi++) {
					item = this.map.tileData(x + xi, y + yi);

					//Remove the last one
					if(item && item.constructor === Array) {
						if(item.length <= 1) {
							delete item[0]._occupiedRect;
							this.map.clearData(x + xi, y + yi);
							continue;
						} else {
							var lastItem = item[item.length - 1];
							delete lastItem;

							//Remove the last item from array and reset the
							//tile data
							item.splice(item.length - 1, 1);
							if(item.length <= 1) {
								this.map.tileData(x + xi, y + yi, item[0]);
							} else {
								this.map.tileData(x + xi, y + yi, item);
							}

							continue;
						}
					}

					if (item && item._occupiedRect) {
						delete item._occupiedRect;
					}

					this.map.clearData(x + xi, y + yi);
				}
			}


		}
		return this;
	},

	/* Gets the total z value of all items placed on this tile
	 * @return { int }
	 */
	getTileZHeight: function(x, y) {
		var tileData = this.tileOccupiedBy(x, y);
		if(typeof tileData === 'undefined') {
			return 0;
		}

		//Multiple items
		if(tileData.constructor === Array) {
			var total = 0;
			for (var i = tileData.length - 1; i >= 0; i--) {
				total += tileData[i]._bounds3d.z;
			}
			return total;
		}

		return tileData._bounds3d.z;
	},
});
