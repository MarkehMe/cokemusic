var GameItem = IgeEntity.extend({
	classId: 'GameItem',

	init: function (gameItem, direction, x, y, tileWidth, tileHeight) {
		IgeEntity.prototype.init.call(this);

		this.data('gameItem', gameItem);

		//Set as isometric and set the texture
		this.isometric(true)
			.texture(ige.gameTexture.furniture);

		//Set the offsets for the selected item.
		if(typeof gameItem != 'undefined') {
			var offsets = GameItemOffsets.init(gameItem, direction);
			this.cell(offsets[0]);
			this.anchor(offsets[1], offsets[2]);
			this.dimensionsFromCell();
		}

		//Set the tileX and tileY cordinates
		if(typeof x != 'undefined') {
			//Set the local varibles
			this.data('tileX', x)
				.data('tileY', y)
				.data('tileWidth', tileWidth)
				.data('tileHeight', tileHeight);

			this.place();
		}

		this._mouseEventsActive = true;

		//Mouse Over
		this._mouseOver = function(x, y) {
			this.highlight(true);
		};

		//Mouse Out
		this._mouseOut = function(x, y) {
			this.highlight(false);
		};

		//Mouse Down
		this._mouseDown = function(x, y) {
			var stand = $('#infostand'),
				standImage = $('#infostand .furniture'),
				standTitle = $('#infostand .title'),
				standDescriptin = $('#infostand .description'),
				furniInfo = FURNITURE[this.data('gameItem')];

			standTitle.text(furniInfo['info']['title']);
			standDescriptin.text(furniInfo['info']['description']);
			standImage.attr('src', './assets/furniture/icons/' + furniInfo['info']['icon']);
			stand.show();
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
		// this.occupyTile(
		// 	this.data('tileX'),
		// 	this.data('tileY'),
		// 	this.data('tileWidth'),
		// 	this.data('tileHeight')
		// );

		//I have no idea why this works. Really don't feel like
		//spending hours trying to figure it out but it should
		//probably be fixed eventually TODO
		var translateX = this.data('tileX'), 
			translateY = this.data('tileY');
		if(this.data('tileWidth') >= 90) {
			translateX = (this.data('tileX') - 0.05);
			translateY = (this.data('tileY') + 0.45);

			console.log(translateX);
			console.log(translateY);
		}

		this.mount(ige.$('tileMap1'))
			.tileWidth( this.data('tileX') / 45 )
			.tileHeight( this.data('tileY') / 45 )
			.bounds3d(this.data('tileHeight'), this.data('tileWidth'), 1)
			.translateToTile(translateX, translateY, 0)
			//.translateToTile(this.data('tileX'), this.data('tileY'))
			.occupyTile(this.data('tileX'), this.data('tileY'), this.data('tileHeight') / 45, this.data('tileWidth') / 45);

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
				this.data('tileWidth'),
				this.data('tileHeight')
			);

			this.data('placed', false);
		}

		// Call the parent class destroy method
		IgeEntity.prototype.destroy.call(this);
	},
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ClientItem; }