var c = Math.cos(-90),
	s = Math.sin(-90);

var trans = [
	c,  -s,  0,
	s + .225,  c, 0, 
	0,  0,  1
];

var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(0);
		ige.input.debug(false);
		ige.globalSmoothing(true);

		// Load our textures
		var self = this;
		this.gameItems = [];

		// Load our textures
		ige.gameTexture = {};
		//self.gameTexture.grassSheet = new IgeCellSheet('../assets/textures/tiles/tilea5b.png', 8, 16);
		ige.gameTexture.grassSheet = new IgeCellSheet(rootPath + 'assets/textures/tiles/grassSheet-2.png', 6, 3);
		ige.gameTexture.carpetTest = new IgeCellSheet(rootPath + 'assets/textures/tiles/carpet-test-2.png', 1, 1);
		ige.gameTexture.purpleTile = new IgeCellSheet(rootPath + 'assets/textures/tiles/floor-tiles.png', 3, 1);
		//self.gameTexture.shrubs 	= new IgeSpriteSheet(rootPath + 'assets/textures/tiles/shrubbery.png');

		//TODO: need to have it auto load all the studio images automaticly from the datafile
		ige.gameTexture.studio_model_a = new IgeTexture(rootPath + 'assets/rooms/studio_model_a.png');
		ige.gameTexture.studio_model_b = new IgeTexture(rootPath + 'assets/rooms/studio_model_b.png');
		ige.gameTexture.studio_model_c = new IgeTexture(rootPath + 'assets/rooms/studio_model_c_1.png');
		ige.gameTexture.studio_model_d = new IgeTexture(rootPath + 'assets/rooms/studio_model_d.png');
		ige.gameTexture.studio_model_rooftop = new IgeTexture(rootPath + 'assets/rooms/Studio_Rooftop_with_Grid_256.png');
		ige.gameTexture.studio_wayne = new IgeTexture(rootPath + 'assets/rooms/wayne_ent_4.png');
		
		ige.gameTexture.leftWall = new IgeTexture(rootPath + 'assets/textures/left_wall_1_a_0_0_0.png');

		//ige.gameTexture.people = new IgeSpriteSheet(rootPath + 'assets/character/people.png');
		ige.gameTexture.people = new TexturePackerAtlas('PEOPLE', rootPath + 'assets/character/data.png', rootPath + 'assets/character/data.js');
		ige.gameTexture.people.hair = new TexturePackerAtlas('PEOPLE', rootPath + 'assets/character/data.png', rootPath + 'assets/character/data.js');

		//Furniture
		ige.gameTexture.furniture = new IgeSpriteSheet(rootPath + 'assets/furniture.png');

		ige.addComponent(IgeEditorComponent);
		//ige.addComponent(IgeEditorRotateComponent);
		
		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {
			// Start the engine
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					ige.addGraph('IgeBaseScene');

					var playerStudio = new PlayerStudio()
						.type('studio_model_b')
						.owner('dev')
						.render();

					ige.room = playerStudio;

					// Create the 3d container that the player
					// entity will be mounted to
					ige.player = new Character()
						.id('player')
						.setStyle('001')
						.setHeadStyle('001')
						.setHairStyle('013')
						.setEyeStyle('001')
						.setMouthStyle('001')
						.setLeftSleveStyle('001')
						.setRightSleveStyle('001')
						.setShirtStyle('001')
						.setPantStyle('001')
						.setShoeStyle('001')
						.startPlayer();
					
					//self.player.triggerPolygon('bounds3dPolygon');

					// Set the camera to track the character with some
					// tracking smoothing turned on (100)
					//ige.$('vp1').camera.trackTranslate(self.player, 100);
					//ige.$('vp1').drawBounds(true);

					//Occupy all the border tiles
					// for (var x = 0; x < 12; x++) {
					// 	for (var y = 0; y < 12; y++) {
					// 		if(x == 0) {
					// 			ige.$collisionMap1.tileData(x, y, true);
					// 		}
					// 	}
					// }

					// //** Generate Carpet Tiles
					// var texIndex = self.textureMap1.addTexture(ige.gameTexture.carpetTest);
					// // Generate some random tiles
					// for (var x = 0; x < 11; x++) {
					// 	for (var y = 0; y < 11; y++) {
					// 		//var rand = Math.ceil(Math.random() * 18);
					// 		self.textureMap1.paintTile(x, y, texIndex, 1);
					// 	}
					// }

					// var TV = new GameItem('tv', 'NW', 1, 1);
					// var Fridge = new GameItem('treasure_chest', 'SE', 1, 2);
					// var Fridge = new GameItem('n_stereo', 'SE', 1, 3);
					// var Fridge = new GameItem('n_stool', 'SE', 1, 4);
					// var Fridge = new GameItem('standing_lamp', 'SE', 1, 5);
					// var Fridge = new GameItem('mini_coke_fridge', 'NE', 1, 6);
					// var Fridge = new GameItem('rack', 'SE', 1, 7);
					// var FridgeT = new GameItem('fridge', 'NW', 1, 8);
					// var FridgeT = new GameItem('round_stereo', 'SE', 1, 9);
					// var FridgeT = new GameItem('sponge_wall', 'SE', 1, 10);
					// var FridgeT = new GameItem('northern_stereo', 'SE', 0, 3);
					// var FridgeT = new GameItem('trashcan', 'SE', 9, 0);
					// var FridgeT = new GameItem('northern_side_table', 'SE', 3, 2);
					// var FridgeT = new GameItem('n_table', 'SE', 3, 3);
					// var FridgeT = new GameItem('v_coke_bookshelf', 'SE', 0, 9);
					// var FridgeT = new GameItem('v_coke_table', 'SE', 3, 7);
					// var FridgeT = new GameItem('northern_stool', 'SE', 2, 4);
					// var FridgeT = new GameItem('acoustopad', 'SW', 0, 4);
					// var FridgeT = new GameItem('aquarium', 'SW', 0, 6);
					// var FridgeT = new GameItem('bubble_gum', 'SW', 0, 7);
					// var FridgeT = new GameItem('beanbag', 'SE', 3, 5);
					// var FridgeT = new GameItem('block', 'SW', 6, 0);
					// var Coke = new GameItem('sofa_coke', 'SW', 6, 1);
					// var Coke = new GameItem('dorm_couch', 'SW', 6, 2);
					// var Coke = new GameItem('northern_sofa', 'SW', 6, 3);
					// var Coke = new GameItem('grundge_couch', 'SW', 6, 4);

						// var obj = new IgeEntity()
						// 	.isometric(true)
						// 	.texture(ige.gameTexture.people)
						// 	.cellById('h_sit_bd_002_2_0.png.png')
						// 	.dimensionsFromCell()
						// 	.mount(ige.room.tileMap())
						// 	.translateToTile(4, 4, 0);

					//Shrubs
					// var xAdj = 0,
					// 	xAdj2 = 0;
					// for (var i = 1; i < self.gameTexture.shrubs.cellCount(); i++) {
					// 	if (i > 1) {
					// 		xAdj += self.gameTexture.shrubs._cells[i][2] / 2;
					// 	}

						// new IgeEntity()
						// 	.texture(self.gameTexture.shrubs)
						// 	.cell(i)
						// 	.dimensionsFromCell()
						// 	.translateTo(-450 + xAdj + xAdj2, 130, 0)
						// 	.mount(self.gameScene);

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
	},
	/**
	 * Returns the item occupying the tile co-ordinates of the tile map.
	 * @param tileX
	 * @param tileY
	 * @param topMost since items can be stacked ontop of eachother check and see
	 *				  if the data is an array and give the last item
	 */
	itemAt: function (tileX, tileY, topMost) {
		// Return the data at the map's tile co-ordinates
		var tileData = ige.room.tileMap().map.tileData(tileX, tileY);

		//console.log(tileData);
		
		if(typeof tileData !== 'undefined' && tileData.constructor === Array && topMost) {
			return tileData[tileData.length - 1];
		}

		return tileData;
	},

	getTexture: function(tAction, tPart, tStyle, tDirection, tSubsection) {
		var	start 		= 'h',
			action		= tAction,
			part 		= tPart,
			style 		= tStyle,
			direction 	= tDirection,
			subsection  = tSubsection;

		//Return the compiled value
		return start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png';
	},

	//Checks if the cordinates are within the map
	withinBounds: function(tileX, tileY) {
		console.log('room: ' + ige.room.object['width'] + " : " + ige.room.object['height']);
		console.log(tileX + " : " + tileY);

		//All tiles will have a positive value
		if(tileX < 0 || tileY < 0) {
			return false;
		}

		//Check if the X or Y is greater than the bounds
		if(tileX >= ige.room.object['width'] || tileY >= ige.room.object['height'] ) {
			return false;
		}

		//Check if this is an invisible block
		var itemAt = this.itemAt(tileX, tileY, true);
		if(typeof itemAt !== 'undefined' && itemAt._classId == 'InvisibleBlock') {
			return false;
		}
		
		//All checks out good
		return true;
	},
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }