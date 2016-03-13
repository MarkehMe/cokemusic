// Define our player character head container classes
var CharacterHair = IgeEntity.extend({
	classId: 'CharacterHair',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (head)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(2)
			//.bounds3d(45, 45, 45)
			.anchor(0, container._container.data('anchorY'));

		self.setTexture();
		//self.setColor('red');

		//Initilize the animations
		// fps = 5.5;
		// this.animation.define('NE', [1], fps, -1)
		// 	.animation.define('NW', [2], fps, -1)
		// 	.animation.define('W',  [3], fps, -1)
		// 	.animation.define('E',  [4], fps, -1)
		// 	.animation.define('SW', [5], fps, -1)
		// 	.animation.define('SE', [6], fps, -1)
		// 	.animation.define('N',  [7], fps, -1)
		// 	.animation.define('S',  [8], fps, -1);

		//Listen for the changeDirection event so we can change
		//the hair animation
		container._container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		container._container.on('onRest', function() { self.rest(); });

		//Finally mount to the container (body)
		self.mount(container);
	},

	changedDirection: function(container, direction) {
		switch(direction) {
			case 'NW': 	
			case 'NE': 
				this.setTexture(0);  
			break;

			case 'W' :  	
			case 'E' : 
				this.setTexture(1);  
			break;

			case 'SW':
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

		this.animation.select(direction);
	},

	setTexture: function(dir, subDir) {
		if(dir === undefined)
			dir = '3';
		if(subDir === undefined)
			subDir = 0;

		dir = this._container._container.directionToInt(dir);
		
		var	start 		= 'h',
			action		= 'std',
			part 		= 'hr',
			style 		= this._container._container.data('hair_style'),
			direction 	= dir,
			subsection  = subDir;

		//Set the body texture
		this.texture(ige.gameTexture.people.hair)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png')
			.dimensionsFromCell();
	},

	rest: function() {
		this.animation.stop();
	},

	setColor: function(colorSelection) {
		this._texture.applyFilter(IgeFilters.colorOverlay, {color: colorSelection});
	}
});