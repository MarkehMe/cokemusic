// Define our player character head container classes
var CharacterPants = IgeEntity.extend({
	classId: 'CharacterPants',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (head)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(2)
			.anchor(0, -19);

		var	start 		= 'h',
			action		= 'std',
			part 		= 'lg',
			style 		= container.data('pant_style'),
			direction 	= '3',
			subsection  = '0';

		self.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png.png')
			.dimensionsFromCell();

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
		container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		container.on('onRest', function() { self.rest(); });

		//Finally mount to the container (body)
		self.mount(container);
	},

	changedDirection: function(container, direction) {
		switch(direction) {
			// case 'NE': 	this.anchor(-3, -37); 	break;
			// case 'NW': 	this.anchor(2, -35); 	break;
			// case 'W': 	this.anchor(4, -35); 	break;
			// case 'E': 	this.anchor(-4, -35); 	break;
			// case 'SW': 	this.anchor(3, -37); 	break;
			// case 'SE': 	this.anchor(-1, -38); 	break;
			// case 'S': 	this.anchor(-3, -36); 	break;
			// case 'N': 	this.anchor(-1, -35); 	break;
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