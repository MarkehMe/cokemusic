// Define our player character shirt container classes
var CharacterShirt = IgeEntity.extend({
	classId: 'CharacterShirt',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (body)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(3)
			.bounds3d(45, 45, 45)
			.anchor(0, -19);

		var	start 		= 'h',
			action		= 'std',
			part 		= 'ch',
			style 		= container.data('shirt_style'),
			direction 	= '3',
			subsection  = '0';

		self.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png.png')
			.dimensionsFromCell();

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
		this._container.leftArm.depth(2);
		this._container.rightArm.depth(2);

		switch(direction) {
			case 'NE': 	
				this.anchor(-2, -14); 	
				this._container.rightArm.depth(4);
				break;
			case 'NW': 	
				this.anchor(0, -15); 	
				this._container.rightArm.depth(4);
				break;
			case 'W': 	
				this.anchor(1, -13); 	
				this._container.leftArm.depth(4);
				break;
			case 'E': 	
				this.anchor(-4, -13); 	
				this._container.rightArm.depth(4);
				break;
			case 'SW': 	
				this.anchor(1, -13); 
				this._container.leftArm.depth(4);	
				break;
			case 'SE': 	
				this.anchor(1, -15); 	
				this._container.rightArm.depth(4);
				break;
			case 'S': 	
				this.anchor(-3, -15); 	
				this._container.leftArm.depth(4);
				this._container.rightArm.depth(4);
				break;
			case 'N': 	
				this.anchor(-1, -13); 	
				break;
			default:
		}

		this.animation.select(direction);
	},

	rest: function() {
		this.animation.stop();
	},

	setColor: function(colorSelection) {
		//'rgba(0, 0, 255, 0.5)'
		this._texture.applyFilter(IgeFilters.colorOverlay, {color: colorSelection});
	}
});