var PlayerStudio = Room.extend({
	init : function (type, owner) {
		var self = this;

		self.type(type);
		self.owner(owner);
	},

	/**
	 * Gets / sets the game scene
	 **/
	gameScene : function (gamescene) {
		if(gamescene !== undefined)	{
			this._gameScene = gamescene;
			return this;
		}

		return this._gameScene;
	},

	/**
	 * Gets / sets the object scene
	 **/
	objectScene : function (objscene) {
		if(objscene !== undefined) {
			this._objScene = objscene;
			return this;
		}

		return this._objScene;
	},

	/**
	 * Gets / sets the current tile map
	 **/
	tileMap : function (tilemap) {
		if(tilemap !== undefined) {
			this._tilemap = tilemap;
			return this;
		}

		return this._tilemap;
	},

	/**
	 * Gets / sets the current collision map
	 **/
	collisionMap : function (colmap) {
		if(colmap !== undefined)	
			this._colmap = colmap;

		return this._colmap;
	},

	/**
	 * Gets / sets the current texture map
	 **/
	textureMap : function (textmap) {
		if(textmap !== undefined) {
			this._texmap = textmap;
			return this;
		}

		return this._texmap;
	},


	/**
	 * Gets / sets the current studio type
	 **/
	type : function (type) {
		if(type !== undefined) {
			this._type = type;

			//Set the actual object that stores all the data
			//from assets/rooms/rooms.js
			if(ROOMS[this._type] !== undefined) {
				this.object = ROOMS[this._type];
				this._width = this.object['width'];
				this._height = this.object['height'];
			}

			return this;
		}

		return this._type;
	},

	/**
	 * Gets / sets the current owner
	 **/
	owner : function (owner) {
		if(owner !== undefined)	{
			this._owner = owner;
			return this;
		}

		return this._owner;
	},

	/**
	 * Render tiles and paint tiles
	 **/
	render : function() {
		if(this.object === undefined)
			return;

		var self = this, 
			globalScale = 1,
			backgroundScale = 1;

		//Check for global scale
		if(typeof self.object['object_scale'] !== 'undefined') {
			globalScale = self.object['object_scale'];
		}

		// Create the game scene
		self._gameScene = new IgeScene2d()
			.id('gameScene')
			.translateTo(self.object['x_offset'], self.object['y_offset'], 0)
			.ignoreCamera(true)
			.drawBounds(false)
			.drawBoundsData(false)
			.scaleTo(globalScale, globalScale, globalScale)
			.mount(ige.$('baseScene'));

		// Create the object scene
		self._objScene = new IgeScene2d()
			.id('objectScene')
			.translateTo(self.object['x_offset'], self.object['y_offset'], 0)
			.drawBounds(false)
			.drawBoundsData(false)
			.ignoreCamera(true)
			.scaleTo(globalScale, globalScale, globalScale)
			.mount(self._gameScene);

		// Create an isometric tile map
		self._tilemap = new GameMap()
			.id('tileMap1')
			.layer(2)
			.drawBounds(false)
			.drawBoundsData(false)
			.translateTo(self.object['x_offset'], self.object['y_offset'], 0)
			.isometricMounts(true)
			.tileWidth($TILESIZE)
			.tileHeight($TILESIZE)
			.gridSize(self.object['width'], self.object['height'])
			.drawGrid(false)
			.drawMouse(true)
			.gridColor('transparent')
			.hoverStrokeColor($HOVER_TILE_COLOR)
			.hoverColor($HOVER_TILE_BG_COLOR)
			.highlightOccupied($HIGHLIGHT_OCCUPIED)
			.scaleTo(globalScale, globalScale, globalScale)
			.mount(self._objScene);

		// Create an isometric left wall
		// self._leftWall = new GameWall()
		// 	.id('leftWall')
		// 	.drawBounds(false)
		// 	.drawBoundsData(false)
		// 	.translateTo(self.object['x_offset'], self.object['y_offset'], 0)
		// 	.isometricMounts(true)
		// 	.tileWidth($TILESIZE)
		// 	.tileHeight($TILESIZE_WALL)
		// 	.gridSize(3, self.object['height'])
		// 	.drawGrid(false)
		// 	.drawMouse(true)
		// 	.gridColor('transparent')
		// 	.hoverStrokeColor($HOVER_TILE_COLOR)
		// 	.hoverColor($HOVER_TILE_BG_COLOR)
		// 	.highlightOccupied($HIGHLIGHT_OCCUPIED)
		// 	.mount(self._objScene);

		// self._texWallMap = new IgeTextureMap()
		// 	.translateTo(self.object['x_offset'], self.object['y_offset'], 0)
		// 	.tileWidth($TILESIZE)
		// 	.tileHeight($TILESIZE_WALL)
		// 	.gridSize(3, self.object['height'])
		// 	.gridColor('#470930')
		// 	.drawGrid($DRAW_GRIDLINES)
		// 	.drawMouse(false)
		// 	.autoSection(self.object['width'])
		// 	.drawSectionBounds(false)
		// 	.isometricMounts(true)
		// 	.mount(self._leftWall);

		// Create the texture map
		self._texMap = new IgeTextureMap()
			.id('textureMap')
			.layer(-1)
			.translateTo(self.object['x_offset'], self.object['y_offset'], 0)
			.tileWidth($TILESIZE)
			.tileHeight($TILESIZE)
			.gridSize(self.object['width'], self.object['height'])
			.gridColor($DRAW_GRIDLINES_COLOR)
			.drawMouse(false)
			.autoSection(self.object['width'])
			.drawSectionBounds(false)
			.isometricMounts(true)
			.scaleTo(globalScale, globalScale, globalScale)
			.mount(self._objScene);

		//Check for background scale
		if(typeof self.object['scale'] !== 'undefined') {
			backgroundScale = self.object['scale'];
		}

		//Create the background map
		self._backgroundImage = new IgeTextureMap()
			.id('background')
			.tileWidth($TILESIZE)
			.tileHeight($TILESIZE)
			.drawMouse(false)
			//.layer(100)
			.scaleTo(backgroundScale, backgroundScale, backgroundScale)
			.texture(ige.gameTexture[self._type])
			.anchor(self.object['x_anchor'], self.object['y_anchor'])
			.dimensionsFromTexture()
			.mount(self._objScene);

		//Create texture for left wall
		self._leftWall = new IgeTileMap2d()
			.id('leftWall')
			.layer(1)
			.drawBounds(false)
			.drawBoundsData(false)
			.translateTo(self.object['x_offset'], self.object['y_offset'], 0)
			.isometricMounts(true)
			.tileWidth($TILESIZE)
			.tileHeight($TILESIZE)
			.gridSize(self.object['width'], self.object['height'])
			.drawGrid(false)
			.drawMouse(false)
			.gridColor('transparent')
			.scaleTo(globalScale, globalScale, globalScale)
			.mount(self._objScene);

		// Occupy all blocked titles as needed
		var blockedTiles = self.object['blocked_tiles'];
		if(typeof blockedTiles != 'undefined') {
			for (var i = blockedTiles.length - 1; i >= 0; i--) {
				var invisibleObj = new InvisibleBlock();
				self._tilemap.occupyTile(blockedTiles[i]['x'], blockedTiles[i]['y'], 1, 1, invisibleObj);
			}
		}

		// Create the tile texture map
		self._tileTexMap = new IgeTextureMap()
			.id('tileTextureMap')
			.translateTo(self.object['x_offset'], self.object['y_offset'], 0)
			.tileWidth($TILESIZE)
			.tileHeight($TILESIZE)
			.gridSize(self.object['width'], self.object['height'])
			.drawMouse(false)
			.layer(-2)
			.isometricMounts(true)
			.autoSection(self.object['width'])
			.drawSectionBounds(false)
			.scaleTo(globalScale, globalScale, globalScale)
			.mount(self._objScene);

		// Generate Carpet Tiles
		if(typeof self.object['draw_floor'] === 'undefined' || self.object['draw_floor'] == true) {
			// var height = ige.gameTexture.carpetTest.sizeY();
			// var width = ige.gameTexture.carpetTest.sizeX();

			// ige.gameTexture.carpetTest.sizeY(height - 5);
			// ige.gameTexture.carpetTest.sizeX(width - 5);
			//ige.gameTexture.carpetTest.resizeByPercent(99, 99);
			var texIndex = self._tileTexMap.addTexture(ige.gameTexture.carpetTest);

			for (var x = 0; x < self.object['width']; x++) {
				for (var y = 0; y < self.object['height']; y++) {

					var isBlocked = false;

					//Make sure the tile isnt blocked
					if(typeof blockedTiles != 'undefined') {
						for (var i = 0; i < blockedTiles.length; i++) {
							if(x === blockedTiles[i]['x'] && y == blockedTiles[i]['y']) {
								isBlocked = true;
							}
						}

						//If it's not blocked paint it
						if(isBlocked == false) {
							self._tileTexMap.paintTile(x, y, texIndex, 1);
						}
					} else {
						//console.log('painting x: ' + x + ', y: ' + y);
						self._tileTexMap.paintTile(x, y, texIndex, 1);
					}

					if(typeof self.object['draw_wall'] === 'undefined' || self.object['draw_wall'] == true) {
						if(x == self.playerStartCords().x && y == self.playerStartCords().y + 1) {
							continue;
						}

						//Paint all the left walls
						if(x == 0 && isBlocked == false) {
							var obj = new IgeEntity()
								.isometric(true)
								.texture(ige.gameTexture.leftWall)
								.dimensionsFromCell()
								.mount(self._leftWall)
								.anchor(-18, -66)
								.translateToTile(x, y, 0);
						}

						//Paint all the right walls
						if(y == 0 && isBlocked == false) {
							var obj = new IgeEntity()
								.isometric(true)
								.texture(ige.gameTexture.rightWall)
								.dimensionsFromCell()
								.mount(self._leftWall)
								.anchor(18, -66)
								.translateToTile(x, y, 0);
						}
					}
				}
			}
		}

		//Draw the grid
		self._texMap.drawGrid($DRAW_GRIDLINES);

		//Door
		if(typeof self.object['door'] !== 'undefined') {
			var startCords = self.playerStartCords();

			//Spawn doorway overlay
			var doortop = new IgeEntity()
				.isometric(true)
				.texture(ige.gameTexture.entry_top)
				.dimensionsFromTexture()
				.mount(self._tilemap)
				.anchor(-20, -102)
				.layer(0)
				.translateToTile(startCords.x, startCords.y, 0);

			//Spawn doorside overlay
			var doorside = new IgeEntity()
				.isometric(true)
				.texture(ige.gameTexture.entry_side)
				.dimensionsFromTexture()
				.mount(self._tilemap)
				.anchor(15, -38)
				.layer(0)
				.translateToTile(startCords.x, startCords.y, 0);
		}

		//Static objects
		if(typeof self.object['static_objects'] !== 'undefined') {
			for (var i = self.object['static_objects'].length - 1; i >= 0; i--) {
				var object = self.object['static_objects'][i];

				var spawn = new IgeEntity()
					.isometric(true)
					.texture(ige.gameTexture[object.name])
					.dimensionsFromTexture()
					.mount(self._tilemap)
					.bounds3d(0, 0, object.height)
					.anchor(object.x_anchor, object.y_anchor)
					//.layer(10)
					.scaleTo(object.scale, object.scale, object.scale)
					.translateToTile(object.spawn.x, object.spawn.y, 0);

			}
		}

		return this;
	},

	playerStartCords: function() {
		return this.object['player_start'];
	}
});