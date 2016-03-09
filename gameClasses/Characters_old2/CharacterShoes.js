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
			.depth(2);

		var	start 		= 'h',
			action		= 'std',
			part 		= 'sh',
			style 		= container.data('shoe_style'),
			direction 	= '3',
			subsection  = '0';

		self.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png.png')
			.dimensionsFromCell();

		//Get the anchor
		y = (self._container.bounds2d().y / 2) - (self.bounds2d().y / 2)
		self.anchor(0, 0);

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