var GameItem = IgeEntity.extend({
	classId: 'GameItem',

	init: function (gameItem, direction, x, y) {
		IgeEntity.prototype.init.call(this);

		var self = this;

		self.data('gameItem', gameItem);
		self.data('currentDirection', direction);

		//Set as isometric and set the texture
		self.isometric(true)
			.texture(ige.gameTexture.furniture);

		//Get the data for the object
		var object = FURNITURE[gameItem];
		self.data('object', object);

		//Load in the texture and offsets.
		self.cell(object['offsets'][direction][0])
			.anchor(object['offsets'][direction][1], object['offsets'][direction][2])
			.dimensionsFromCell();

		//Set the tileX and tileY cordinates
		self.data('tileX', x)
			.data('tileY', y)
			.data('tileXWidth',  object['offsets'][direction][3])
			.data('tileYHeight', object['offsets'][direction][4])
			.data('objectHeight', object['info']['height']);

		self.place();
		
		self._mouseEventsActive = true;

		//Mouse Over
		self._mouseOver = function(x, y) {
			if(ige.movingItem === false) {
				self.highlight(true);
			}
		};

		//Mouse Out
		self._mouseOut = function(x, y) {
			if(ige.movingItem === false) {
				self.highlight(false);
			}
		};

		//Mouse Down
		self._mouseDown = function(x, y) {
			var stand = $('#infostand'),
				standImage = $('#infostand .furniture'),
				standTitle = $('#infostand .title'),
				standDescriptin = $('#infostand .description'),
				furniInfo = FURNITURE[this.data('gameItem')];

			standTitle.text(furniInfo['info']['title']);
			standDescriptin.text(furniInfo['info']['description']);
			standImage.attr('src', './assets/furniture/icons/' + furniInfo['info']['icon']);
			stand.show();

			ige.selected = self;
		};
	},

	/**
	 * Places the item down on the map by setting the tiles it
	 * is "over" as occupied by the item on the tile map.
	 * @return {*}
	 */
	place: function () {
		// Call the occupyTile method with the tile details.
		// This method doesn't exist in IgeEntity but is instead
		// added to an entity when that entity is mounted to a
		// tile map. The method tells the tile map that the
		// entity is mounted to that the tiles specified are now
		// taken up by this entity.
		this.occupyTile(
			this.data('tileX'),
			this.data('tileY'),
			this.data('tileXWidth'),
			this.data('tileYHeight')
		);

		// TODO: I have no idea why this works. Really don't feel like
		//spending hours trying to figure it out but it should
		//probably be fixed eventually
		var translateX = this.data('tileX'), 
			translateY = this.data('tileY');

		if(this.data('tileYHeight') >= 2) {
			//translateX = (this.data('tileX') - 0.05);
			//If an item takes up multiple tiles then it looks like
			//there would be some kind of formula to figure this out
			//Bascially a tile is = 45 whenever there are 2 tiles the
			//exact difference to make it align is 22.5 (45/2) and since
			//we are using 1,2,3,4 that equals out to half (.5) and thats
			//why I'm adding it here
			translateY = (this.data('tileY') + 0.50);
		}

		var tilemap = ige.$('tileMap1');

		this.mount(ige.$('tileMap1'))
			.tileWidth( this.data('tileXWidth'))
			.tileHeight( this.data('tileYHeight'))
			.bounds3d(this.data('tileXWidth') * tilemap._tileWidth, this.data('tileYHeight') * tilemap._tileHeight, this.data('objectHeight'))
			.translateToTile(translateX, translateY, 0)
			.occupyTile(this.data('tileX'), this.data('tileY'), this.data('tileXWidth'), this.data('tileYHeight'));

		this.data('placed', true);

		return this;
	},

	/**
	 * Moves the tile placement of the item from it's current
	 * tile location to the new tile location specified. Also
	 * translates the entity.
	 * @param tileX
	 * @param tileY
	 * @return {*}
	 */
	moveTo: function (tileX, tileY) {
		if (this.data('placed')) {
			// Un-occupy the current tiles
			this.unOccupyTile(
				this.data('tileX'),
				this.data('tileY'),
				this.data('tileWidth'),
				this.data('tileHeight')
			);

			// Set the new tile position
			this.data('tileX', tileX)
				.data('tileY', tileY);

			this.occupyTile(
				this.data('tileX'),
				this.data('tileY'),
				this.data('tileWidth'),
				this.data('tileHeight')
			);

			this.translateToTile(
				this.data('tileX'),
				this.data('tileY')
			);
		}

		return this;
	},

	/**
	 * Handles destroying the entity from memory.
	 */
	destroy: function () {
		// Un-occupy the tiles this entity currently occupies
		if (this.data('placed')) {
			this.unOccupyTile(
				this.data('tileX'),
				this.data('tileY'),
				this.data('tileXWidth'),
				this.data('tileYHeight')
			);

			this.data('placed', false);
		}

		$('#infostand').hide();

		// Call the parent class destroy method
		IgeEntity.prototype.destroy.call(this);
	},

	/**
	 * Handles rotating the item.
	 */
	rotate: function() {
		var self = this;

		// Un-occupy the current tiles
		this.unOccupyTile(
			this.data('tileX'),
			this.data('tileY'),
			this.data('tileWidth'),
			this.data('tileHeight')
		);

		function getNewDirection() {
			var current = self.data('currentDirection');

			switch(current) {
				case 'SE': return 'SW';
				case 'SW': return 'NW';
				case 'NW': return 'NE';
				case 'NE': return 'SE';
			}
		}

		var newDirection = getNewDirection(),
			direction = self.data('object')['offsets'][newDirection];

		this.data('currentDirection', newDirection);

		self.cell(direction[0])
			.anchor(direction[1], direction[2])
			.dimensionsFromCell();

			console.log( newDirection);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ClientItem; }