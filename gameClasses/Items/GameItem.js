var GameItem = IgeEntity.extend({
	classId: 'GameItem',

	init: function (gameItem, direction, x, y, tileWidth, tileHeight) {
		IgeEntity.prototype.init.call(this);

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

		this.mount(ige.$('tileMap1'))
			.translateToTile(this.data('tileX'), this.data('tileY'))
			.bounds3d(this.data('tileWidth'), this.data('tileHeight'), 1)
			.occupyTile(this.data('tileX'), this.data('tileY'));

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