// Define our player character head container classes
var CharacterBody = IgeEntity.extend({
	classId: 'CharacterBody',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (body)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(1)
			.bounds3d(45, 45, 45)
			.anchor(0, 0);

		self.setTexture();

		//Initilize the animations
		// fps = 5.5;
		// this.animation.define('NE', [1], fps, -1)
		// 	.animation.define('NW', [8], fps, -1)
		// 	.animation.define('W',  [7], fps, -1)
		// 	.animation.define('E',  [2], fps, -1)
		// 	.animation.define('SW', [6], fps, -1)
		// 	.animation.define('SE', [3], fps, -1)
		// 	.animation.define('S',  [4], fps, -1)
		// 	.animation.define('N',  [5], fps, -1);

		// //Listen for the changeDirection event
		container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		container.on('onRest', function() { self.rest(); });

		//Finally mount to the container (body)
		self.mount(container);
	},

	changedDirection: function(container, direction) {
		this._scale.x = 1;

		switch(direction) {
			case 'NW': this._scale.x = -1; 	
			case 'NE': 
				this.setTexture(0);  
			break;

			case 'W' : this._scale.x = -1; 	
			case 'E' : 
				this.setTexture(1);  
			break;

			case 'SW': this._scale.x = -1; 	
			case 'SE' : 
				this.setTexture(2);  
			break;

			case 'S' : 
				this.setTexture(3);  
			break;

			case 'N' : 
				this.setTexture(7);  
			break;	
		}

		//String builder for the direction
		var anim = 'walk' + direction;

		//Animate
		//this.animation.select(anim);
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
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png')
			.dimensionsFromCell();
	},

	rest: function() {
		this.animation.stop();
	},
});