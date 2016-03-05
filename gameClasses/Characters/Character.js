// Define our player character container classes
var Character = IgeEntity.extend({
	classId: 'Character',

	init: function () {
		var self = this;
		IgeEntity.prototype.init.call(this);

		// Create a character entity as a child of this container
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.bounds3d(45, 45, 58)
			.anchor(0, 0);

		self.mouseOver(self.overFunc);
		self.mouseOut(self.outFunc);

		// Create a path finder
		self.pathFinder = new IgePathFinder()
			.neighbourLimit(100);

		// Assign the pathfinder to the player
		self.addComponent(IgePathComponent).path
			.finder(self.pathFinder)
			.tileMap(ige.room.tileMap())
			.tileChecker(function (tileData, tileX, tileY, node, prevNodeX, prevNodeY, dynamic) {
				// If the map tile data is set to 1, don't allow a path along it
				if (tileData != null) return false;
				return true;
			})
			.lookAheadSteps(10)
			.dynamic(true)
			.allowSquare(true) // Allow north, south, east and west movement
			.allowDiagonal(true) // Allow north-east, north-west, south-east, south-west movement
			.drawPath(false) // Enable debug drawing the paths
			.drawPathGlow(false) // Enable path glowing (eye candy)
			.drawPathText(false); // Enable path text output


		// //Spawn the head
		// self.head = new CharacterHead(self);

		// //Spawn left arm
		// self.leftArm = new CharacterLeftArm(self);

		// //Spawn right arm
		// self.rightArm = new CharacterRightArm(self);

		// //Spawn shirt
		// self.shirt = new CharacterShirt(self);

		//Load the character texture
		// this._characterTexture = new IgeCellSheet(rootPath + 'assets/bodies.png', 5, 8);

		// Wait for the texture to load
		// this._characterTexture.on('loaded', function () {
		// 	self.texture(self._characterTexture)
		// 		.dimensionsFromCell();
		// }, false, true);
	},

	setStyle: function(str) {
		this.data('style', str);
		return this;
	},

	setHeadStyle: function(str) {
		this.data('head_style', str);
		return this;
	},


	setHairStyle: function(str) {
		this.data('hair_style', str);
		return this;
	},

	setEyeStyle: function(str) {
		this.data('eye_style', str);
		return this;
	},

	setMouthStyle: function(str) {
		this.data('mouth_style', str);
		return this;
	},

	setShirtStyle: function(str) {
		this.data('shirt_style', str);
		return this;
	},

	setPantStyle: function(str) {
		this.data('pant_style', str);
		return this;
	},

	setShoeStyle: function(str) {
		this.data('shoe_style', str);
		return this;
	},

	startPlayer: function() {
		var self = this;
		
		//Spawn the body
		self.body = new CharacterBody(self);

		//Spawn the head
		self.head = new CharacterHead(self);

		//Spawn left arm
		self.leftArm = new CharacterLeftArm(self);

		//Spawn right arm
		self.rightArm = new CharacterRightArm(self);

		//Spawn shirt
		//self.shirt = new CharacterShirt(self);

		//Spawn left shirt sleve
		//self.leftSleve = new CharacterLeftSleve(self);

		//Spawn right shirt sleve
		//self.rightSleve = new CharacterRightSleve(self);

		//Spawn pants
		//self.pant = new CharacterPants(self);

		//Spawn shoes
		self.shoes = new CharacterShoes(self);

		//Finally mount the player
		self.addComponent(PlayerComponent)
			.mount(ige.room.tileMap());
	},

	/**
	 * Sets the type of character which determines the character's
	 * animation sequences and appearance.
	 * @param {Number} type From 0 to 7, determines the character's
	 * appearance.
	 * @return {*}
	 */
	setType: function (type) {
		this.animation.stop();
		this.animation.clearAll();

		switch (type) {
			case 8:
				var fps = 5.3;
				this.animation.define('walkNE' , [1, 2, 3, 4], fps, -1)
					.animation.define('standNE', [5], fps, -1)
					.animation.define('walkNW' , [6, 7, 8, 9], fps, -1)
					.animation.define('standNW', [10], fps, -1)
					.animation.define('walkW'  , [14, 13, 12, 11], fps, -1)
					.animation.define('standW' , [15], fps, -1)
					.animation.define('walkE'  , [16, 17, 18, 19], fps, -1)
					.animation.define('standE' , [20], fps, -1)
					.animation.define('walkSW' , [24, 23, 22, 21], fps, -1)
					.animation.define('standSW', [25], fps, -1)
					.animation.define('walkSE' , [26, 27, 28, 29], fps, -1)
					.animation.define('standSE', [30], fps, -1)
					.animation.define('walkS'  , [31, 32, 33, 34], fps, -1)
					.animation.define('standS' , [35], fps, -1)
					.animation.define('walkN'  , [36, 37, 38, 39], fps, -1)
					.animation.define('standN' , [40], fps, -1)
					.cell(1);

				this._restCell = 40;
				break;
		}

		this._characterType = type;

		return this;
	},

	rest: function() {
		this.animation.setFrame('stand' + this._currentDirection, 0);

		//Let all the children know
		this.emit('onRest', []);
	},

	/**
	 * Tweens the character to the specified world co-ordinates.
	 * @param x
	 * @param y
	 * @return {*}
	 */
	walkTo: function (x, y) {
		var self = this,
			distX = x - this.translate().x(),
			distY = y - this.translate().y(),
			distance = Math.distance(
				this.translate().x(),
				this.translate().y(),
				x,
				y
			),
			speed = 0.1,
			time = (distance / speed),
			direction = '';

		// Set the animation based on direction - these are modified
		// for isometric views
		if (distY < 0) {
			direction += 'N';
		}

		if (distY > 0) {
			direction += 'S';
		}

		if (distX > 0) {
			direction += 'E';
		}

		if (distX < 0) {
			direction += 'W';
		}

		this.changeDirection(direction);

		// Start tweening the little person to their destination
		this._translate.tween()
			.stopAll()
			.properties({x: x, y: y})
			.duration(time)
			.afterTween(function () {
				self.animation.stop();
			})
			.start();

		return this;
	},

	changeDirection: function(direction) {
		//String builder for the direction
		var anim = 'walk' + direction;

		//Animate
		this.animation.select(anim);

		//Store the values
		this._currentDirection = direction;
		this._currentAnimation = anim;

		//Let all the children know
		this.emit('onChangedDirection', [this, direction]);
	},

	tick: function (ctx) {
		// Set the depth to the y co-ordinate which basically
		// makes the entity appear further in the foreground
		// the closer they become to the bottom of the screen
		//this.depth(this._translate.y);
		IgeEntity.prototype.tick.call(this, ctx);
	},

	// Define a function that will be called when the
	// mouse cursor moves away from one of our entities
	outFunc: function () {
		//this.highlight(false);
		/*this.drawBounds(false);
		this.drawBoundsData(false);*/
	},

	// Define a function that will be called when the
	// mouse cursor moves over one of our entities
	overFunc: function () {
		//this.highlight(true);
		/*this.drawBounds(true);
		this.drawBoundsData(true);*/
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Character; }
