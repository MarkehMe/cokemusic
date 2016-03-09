// Define our player character shirt container classes
var CharacterShoes = IgeEntity.extend({
	classId: 'CharacterShoes',

	init: function (container) {
		var self = this, fps, y;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (body)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(2)
			.anchor(0, container.data('anchorY'));

		self.setTexture();

		// //Initilize the animations
		// fps = 5.5;
		// this.animation.define('NE', [1], fps, -1)
		// 	.animation.define('NW', [2], fps, -1)
		// 	.animation.define('W',  [4], fps, -1)
		// 	.animation.define('E',  [3], fps, -1)
		// 	.animation.define('SW', [5], fps, -1)
		// 	.animation.define('SE', [6], fps, -1)
		// 	.animation.define('N',  [7], fps, -1)
		// 	.animation.define('S',  [8], fps, -1);

		//Listen for the changeDirection event so we can change
		//the hair animation
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

		this.animation.select(direction);
	},

	setTexture: function(dir, subDir) {
		if(dir === undefined)
			dir = '3';
		if(subDir === undefined)
			subDir = 0;

		dir = this._container.directionToInt(dir);
		
		var	start 		= 'h',
			action		= 'std',
			part 		= 'sh',
			style 		= this._container.data('shoe_style'),
			direction 	= dir,
			subsection  = subDir;

		this.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png')
			.dimensionsFromCell();
	},

	rest: function() {
		this.animation.stop();
	},

	setColor: function(colorSelection) {
		//'rgba(0, 0, 255, 0.5)'
		this._texture.applyFilter(IgeFilters.colorOverlay, {color: colorSelection});
	}
});