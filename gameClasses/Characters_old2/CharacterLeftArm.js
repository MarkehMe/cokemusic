// Define our player character head container classes
var CharacterLeftArm = IgeEntity.extend({
	classId: 'CharacterLeftArm',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (body)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(2)
			.drawBounds(false)
			.anchor(12, -43);

		self.setTexture();

		// //Initilize the animations
		// fps = 5.3 / 2;
		// this.animation.define('NE', [3, 4], fps, -1)
		// 	.animation.define('NW', [8, 7], fps, -1)
		//  	.animation.define('W',  [11, 12], fps, -1)
		//     .animation.define('SW', [15, 16], fps, -1)
		// 	.animation.define('SE', [18, 17], fps, -1)
		// 	.animation.define('S',  [24, 23], fps, -1)
		// 	.animation.define('N',  [28, 27], fps, -1);

		// //Standing Animations
		// this.animation.define('standNE', [29], fps, -1)
		// 	.animation.define('standNW', [31], fps, -1)
		//  	.animation.define('standW',  [33], fps, -1)
		//     .animation.define('standSW', [35], fps, -1)
		// 	.animation.define('standSE', [38], fps, -1)
		// 	.animation.define('standS',  [41], fps, -1)
		// 	.animation.define('standN',  [39], fps, -1);

		//Listen for the changeDirection event so we can change
		//the heads animation
		container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		container.on('onRest', function() { self.rest(); });

		//Finally mount to the container (body)
		self.mount(container);
	},

	changedDirection: function(container, direction) {
		// switch(direction) {
		// 	// case 'NE': 	this.depth(1); this.anchor(-10, -14); 	break;
		// 	// case 'NW': 	this.depth(2); this.anchor(7, -14); 	break;
		// 	// case 'W': 	this.anchor(5, -12); 	break;
		// 	// case 'E': 	this.hide(); 			break;
		// 	// case 'SW': 	this.anchor(8, -13); 	break;
		// 	// case 'SE': 	this.anchor(3, -13); 	break;
		// 	// case 'S': 	this.anchor(4, -15); 	break;
		// 	// case 'N': 	this.anchor(-10, -12); 	break;
		// 	default:
		// }

		this._scale.x = 1;
		this.show();

		switch(direction) {
			case 'NW': this._scale.x = -1; 	
			case 'NE': 
				this.setTexture(0);  
			break;

			case 'W' : 
				this._scale.x = -1;
				this.setTexture(1);
			break;

			case 'E' : 
				this.hide();
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
			dir = '1';
		if(subDir === undefined)
			subDir = 0;

		var	start 		= 'h',
			action		= 'std',
			part 		= 'lh',
			style 		= this._container.data('style'),
			direction 	= dir,
			subsection  = subDir;

		this.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png')
			.dimensionsFromCell();
	},

	rest: function() {
		switch(this._container._currentDirection) {
			case 'SE': this.anchor(3, -16); break;
		}

		this.animation.setFrame('stand' + this._container._currentDirection, 0);

		//this.animation.stop();
	},
});