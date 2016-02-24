var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(0);
		ige.input.debug(false);
		ige.globalSmoothing(true);

		// Load our textures
		var self = this;
		this.obj = [];

		// Load our textures
		self.gameTexture = {};
		//self.gameTexture.grassSheet = new IgeCellSheet('../assets/textures/tiles/tilea5b.png', 8, 16);
		self.gameTexture.grassSheet = new IgeCellSheet(rootPath + 'assets/textures/tiles/grassSheet-2.png', 6, 3);
		self.gameTexture.carpetTest = new IgeCellSheet(rootPath + 'assets/textures/tiles/carpet-test-2.png', 1, 1);
		self.gameTexture.purpleTile = new IgeCellSheet(rootPath + 'assets/textures/tiles/floor-tiles.png', 3, 1);
		//self.gameTexture.shrubs 	= new IgeSpriteSheet(rootPath + 'assets/textures/tiles/shrubbery.png');

		//Furniture
		self.gameTexture.furniture = new IgeSpriteSheet(rootPath + 'assets/furniture.png');

		ige.addComponent(IgeEditorComponent);
		
		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {
			// Start the engine
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					ige.addGraph('IgeBaseScene');
					
					// Create the scene
					self.scene1 = new IgeScene2d()
						.id('scene1')

					var baseScene = ige.$('baseScene');

					self.gameScene = new IgeScene2d()
						.id('gameScene')
						.translateTo(0, -120, 0)
						.mount(baseScene);

					self.objectScene = new IgeScene2d()
						.id('objectScene')
						.drawBounds(false)
						.drawBoundsData(false)
						.mount(self.gameScene);

					// Create an isometric tile map
					self.tileMap1 = new IgeTileMap2d()
						.id('tileMap1')
						.isometricMounts(true)
						.tileWidth(45)
						.tileHeight(45)
						.gridSize(10, 10)
						.drawGrid(false)
						.drawMouse(true)
						.hoverStrokeColor('#FFE436')
						.hoverColor('transparent')
						.highlightOccupied(true)
						.mount(self.objectScene);

					// Create the texture maps
					self.textureMap1 = new IgeTextureMap()
						.tileWidth(45)
						.tileHeight(45)
						.gridSize(10, 10)
						.gridColor('#470930')
						.drawGrid(false)
						.drawMouse(false)
						.autoSection(11)
						.drawSectionBounds(false)
						.isometricMounts(true)
						.mount(self.objectScene);

					//Collision map
					ige.$collisionMap1 = new IgeMap2d();

					// Create the 3d container that the player
					// entity will be mounted to
					self.player = new Character()
						.id('player')
						.addComponent(PlayerComponent)
						.isometric(true)
						.mount(self.tileMap1);
					
					//self.player.triggerPolygon('bounds3dPolygon');

					// Set the camera to track the character with some
					// tracking smoothing turned on (100)
					//ige.$('vp1').camera.trackTranslate(self.player, 100);
					//ige.$('vp1').drawBounds(true);

					//Occupy all the border tiles
					for (var x = 0; x < 11; x++) {
						for (var y = 0; y < 11; y++) {
							if(x == 0) {
								ige.$collisionMap1.tileData(x, y, true);
							}
						}
					}

					//self.tileMap1.map.collision.tileData(0, 0, true);
					console.log(self.tileMap1.map.collision);
					ige.$collisionMap1.tileData(0, 1, true);
					ige.$collisionMap1.tileData(0, 2, true);
					ige.$collisionMap1.tileData(0, 3, true);
					ige.$collisionMap1.tileData(1, 0, true);
					ige.$collisionMap1.tileData(1, 1, true);
					ige.$collisionMap1.tileData(1, 2, true);
					ige.$collisionMap1.tileData(1, 3, true);
					ige.$collisionMap1.tileData(2, 0, true);
					ige.$collisionMap1.tileData(2, 1, true);
					ige.$collisionMap1.tileData(2, 2, true);
					ige.$collisionMap1.tileData(2, 3, true);
					ige.$collisionMap1.tileData(3, 0, true);
					ige.$collisionMap1.tileData(3, 1, true);
					ige.$collisionMap1.tileData(3, 2, true);
					ige.$collisionMap1.tileData(3, 3, true);

					//** Generate Carpet Tiles
					var texIndex = self.textureMap1.addTexture(self.gameTexture.carpetTest);
					//Generate some random tiles
					for (var x = 0; x < 10; x++) {
						for (var y = 0; y < 10; y++) {
							//var rand = Math.ceil(Math.random() * 18);
							self.textureMap1.paintTile(x, y, texIndex, 1);
						}
					}

					// self.textureMap1.paintTile(0, 0, texIndex, 1);
					// self.textureMap1.paintTile(0, 1, texIndex, 1);
					// self.textureMap1.paintTile(0, 2, texIndex, 1);
					// self.textureMap1.paintTile(0, 3, texIndex, 1);

					// self.textureMap1.paintTile(1, 0, texIndex, 1);
					// self.textureMap1.paintTile(1, 1, texIndex, 1);
					// self.textureMap1.paintTile(1, 2, texIndex, 1);
					// self.textureMap1.paintTile(1, 3, texIndex, 1);

					// self.textureMap1.paintTile(2, 0, texIndex, 1);
					// self.textureMap1.paintTile(2, 1, texIndex, 1);
					// self.textureMap1.paintTile(2, 2, texIndex, 1);
					// self.textureMap1.paintTile(2, 3, texIndex, 1);

					// self.textureMap1.paintTile(3, 0, texIndex, 1);
					// self.textureMap1.paintTile(3, 1, texIndex, 1);
					// self.textureMap1.paintTile(3, 2, texIndex, 1);
					// self.textureMap1.paintTile(3, 3, texIndex, 1);

					//Fridge
					new IgeEntity()
						.isometric(true)
						.texture(self.gameTexture.furniture)
						.anchor(0, -15)
						.cell(4)
						.dimensionsFromCell()
						.mount(self.tileMap1)
						.translateToTile(0, 2)
						.bounds3d(45, 45, 1)
						.occupyTile(0, 2);

					//TV
					new IgeEntity()
						.isometric(true)
						.triggerPolygon('bounds3dPolygon')
						.mount(self.tileMap1)
						//.bounds3d(45, 45, 0)
						.texture(self.gameTexture.furniture)
						.anchor(0, -10)
						.cell(7)
						.bounds3d(45, 45, 1)
						.dimensionsFromCell()
						//.mount(self.tileMap1)
						.translateToTile(0, 1)
						.occupyTile(0, 1);

					//Fridge, far out
					new IgeEntity()
						.isometric(true)
						.texture(self.gameTexture.furniture)
						.anchor(0, -15)
						.cell(4)
						//.depth(3)
						.bounds3d(45, 45, 1)
						.dimensionsFromCell()
						.mount(self.tileMap1)
						.translateToTile(4, 4)
						.occupyTile(4, 4);

					//Coke Sofa, far out
					new IgeEntity()
						.isometric(true)
						.texture(self.gameTexture.furniture)
						.anchor(0, -20)
						.cell(1)
						.bounds3d(45, 90, 1)
						.dimensionsFromCell()
						.mount(self.tileMap1)
						.tileWidth(1)
						.tileHeight(2)
						.translateToTile(.95, 4.45, 0)
						.occupyTile(1, 4, 1, 2);


					//Shrubs
					// var xAdj = 0,
					// 	xAdj2 = 0;
					// for (var i = 1; i < self.gameTexture.shrubs.cellCount(); i++) {
					// 	if (i > 1) {
					// 		xAdj += self.gameTexture.shrubs._cells[i][2] / 2;
					// 	}

					// 	new IgeEntity()
					// 		.texture(self.gameTexture.shrubs)
					// 		.cell(i)
					// 		.dimensionsFromCell()
					// 		.translateTo(-450 + xAdj + xAdj2, 130, 0)
					// 		.mount(self.gameScene);

					// 	xAdj += (self.gameTexture.shrubs._cells[i][2] / 2) + 5;
					// }

					// Start traversing the path!
					// self.player.path
					// 	.set(0, 0, 0, 3, 7, 0)
					// 	.speed(3)
					// 	.start(1000);
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }