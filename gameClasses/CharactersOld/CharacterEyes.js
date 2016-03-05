// Define our player character head container classes
var CharacterEyes = IgeEntity.extend({
	classId: 'CharacterEyes',

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
		this._texture = new IgeCellSheet(rootPath + 'assets/eyes.png', 1, 5);

		// Wait for the texture to load
		this._texture.on('loaded', function () {
			self.texture(self._texture)
				.dimensionsFromCell();		
		}, false, true);

		//Initilize the animations
		fps = 1;
		this.animation.define('W',  [5], fps, -1)
		    .animation.define('E',  [4], fps, -1)
		    .animation.define('SW', [3], fps, -1)
			.animation.define('SE', [2], fps, -1)
			.animation.define('S',  [1], fps, -1);

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
			case 'W': 	this.anchor(-7, -42); 	break;
			case 'E': 	this.anchor(7, -42);	break;
			case 'SW': 	this.anchor(-2, -42); 	break;
			case 'SE': 	this.anchor(5, -44); 	break;
			case 'S': 	this.anchor(-2, -40); 	break;
			case 'N': 	this.hide(); 	break;
			default:
		}

		this.animation.select(direction);
	},

	rest: function() {
		this.animation.stop();
	},
});