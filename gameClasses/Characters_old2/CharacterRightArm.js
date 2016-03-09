// Define our player character head container classes
var CharacterRightArm = IgeEntity.extend({
	classId: 'CharacterRightArm',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (body)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(2)
			.anchor(-12, -43);

		self.setTexture();

		//Initilize the animations
		// fps = 5.3 / 2;
		// this.animation.define('NE', [1, 2], fps, -1)
		//     .animation.define('NW', [6, 5], fps, -1)
		// 	.animation.define('E',  [9, 10], fps, -1)
		// 	.animation.define('SW', [14, 13], fps, -1)
		// 	.animation.define('SE', [20, 19], fps, -1)
		// 	.animation.define('S',  [21, 22], fps, -1)
		// 	.animation.define('N',  [25, 26], fps, -1);

		// //Standing Animations
		// this.animation.define('standNE', [30], fps, -1)
		//     .animation.define('standNW', [32], fps, -1)
		// 	.animation.define('standE',  [34], fps, -1)
		// 	.animation.define('standSW', [36], fps, -1)
		// 	.animation.define('standSE', [37], fps, -1)
		// 	.animation.define('standS',  [42], fps, -1)
		// 	.animation.define('standN',  [40], fps, -1);


		//Listen for the changeDirection event so we can change
		//the heads animation
		container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		container.on('onRest', function() { self.rest(); });

		//Finally mount to the container (body)
		self.mount(container);
	},

	changedDirection: function(container, direction) {
		// this.show();
		// this.depth(2);

		// switch(direction) {
		// 	case 'NE': 	this.anchor(5, -12); 	break;
		// 	case 'NW': 	this.anchor(-7, -14); 	break;
		// 	case 'W': 	this.hide(); 	break;
		// 	case 'E': 	this.anchor(-5, -12); 	break;
		// 	case 'SW': 	this.depth(1); this.anchor(-4, -13); 	break;
		// 	case 'SE': 	this.anchor(-7, -14); 	break;
		// 	case 'S': 	this.anchor(-11, -15); 	break;
		// 	case 'N': 	this.anchor(5, -13); 	break;
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
				this.hide();
			break;

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
			dir = '1';
		if(subDir === undefined)
			subDir = 0;

		var	start 		= 'h',
			action		= 'std',
			part 		= 'rh',
			style 		= this._container.data('style'),
			direction 	= dir,
			subsection  = subDir;

		this.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png.png')
			.dimensionsFromCell();
	},

	rest: function() {
		switch(this._container._currentDirection) {
			case 'SW': this.anchor(-4, -17); break;
			case 'E': this.anchor(-7, -12); break;
		}

		this.animation.setFrame('stand' + this._container._currentDirection, 0);
		
		//this.animation.stop();
	},
});