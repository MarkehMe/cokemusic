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
			.anchor(0, -44);

		var	start 		= 'h',
			action		= 'std',
			part 		= 'ey',
			style 		= container._container.data('eye_style'),
			direction 	= '3',
			subsection  = '0';

		self.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png')
			.dimensionsFromCell();

		//Initilize the animations
		// fps = 1;
		// this.animation.define('W',  [5], fps, -1)
		//     .animation.define('E',  [4], fps, -1)
		//     .animation.define('SW', [3], fps, -1)
		// 	.animation.define('SE', [2], fps, -1)
		// 	.animation.define('S',  [1], fps, -1);

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
			// case 'NE': 	this.hide(); 	break;
			// case 'NW': 	this.hide(); 	break;
			// case 'W': 	this.anchor(-7, -42); 	break;
			// case 'E': 	this.anchor(7, -42);	break;
			// case 'SW': 	this.anchor(-2, -42); 	break;
			// case 'SE': 	this.anchor(5, -44); 	break;
			// case 'S': 	this.anchor(-2, -40); 	break;
			// case 'N': 	this.hide(); 	break;
			default:
		}

		this.animation.select(direction);
	},

	setTexture: function(dir, subDir) {
		if(dir === undefined)
			dir = '1';
		if(subDir === undefined)
			subDir = 0;

		var	start 		= 'h',
			action		= 'std',
			part 		= 'bd',
			style 		= this._container.data('style'),
			direction 	= dir,
			subsection  = subDir;

		//Set the body texture
		this.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png.png')
			.dimensionsFromCell();
	},

	rest: function() {
		this.animation.stop();
	},
});