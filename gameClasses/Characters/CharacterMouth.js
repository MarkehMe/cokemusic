// Define our player character head container classes
var CharacterMouth = IgeEntity.extend({
	classId: 'CharacterMouth',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (body)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(2)
			.bounds3d(45, 45, 45)
			.anchor(-2, -9);

		//TODO: should probably load all the textures at once and
		//store in global vars
		//Load the texture
		this._texture = new IgeCellSheet(rootPath + 'assets/mouth.png', 1, 5);

		// Wait for the texture to load
		this._texture.on('loaded', function () {
			self.texture(self._texture)
				.dimensionsFromCell();		
		}, false, true);

		//Initilize the animations
		fps = 1;
		this.animation.define('W',  [2], fps, -1)
		    .animation.define('E',  [1], fps, -1)
		    .animation.define('SW', [5], fps, -1)
			.animation.define('SE', [4], fps, -1)
			.animation.define('S',  [3], fps, -1);

		//Listen for the changeDirection event so we can change
		//the eye direction
		container._container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		container._container.on('onRest', function() { self.rest(); });

		//Finally mount to the container (head)
		self.mount(container);
	},

	changedDirection: function(container, direction) {
		this.show();

		switch(direction) {
			case 'NE': 	this.hide(); 	break;
			case 'NW': 	this.hide(); 	break;
			case 'W': 	this.anchor(-3, -37); 	break;
			case 'E': 	this.anchor(3, -37);	break;
			case 'SW': 	this.anchor(-3, -35); 	break;
			case 'SE': 	this.anchor(5, -36); 	break;
			case 'S': 	this.anchor(-2, -35); 	break;
			case 'N': 	this.hide(); 	break;
			default:
		}

		this.animation.select(direction);
	},

	rest: function() {
		this.animation.stop();
	},
});