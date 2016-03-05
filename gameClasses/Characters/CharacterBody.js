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

		var	start 		= 'h',
			action		= 'std',
			part 		= 'bd',
			style 		= container.data('style'),
			direction 	= '1',
			subsection  = '0';

		//Set the body texture
		self.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png.png')
			.dimensionsFromCell();

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
		switch(direction) {
			case 'W': this._scale.x = -1; 	break;
			case 'E': this._scale.x = 1;	break;
		}

		//String builder for the direction
		var anim = 'walk' + direction;

		//Animate
		this.animation.select(anim);

		//Store the values
		this._currentDirection = direction;
		this._currentAnimation = anim;

		//Let all the children know
		this.emit('onChangedDirection', [this, direction]);
	},
	rest: function() {
		this.animation.stop();
	},
});