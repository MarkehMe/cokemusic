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
			//.bounds3d(45, 45, 45)
			.anchor(0, container._container.data('anchorY'));

		self.setTexture();

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
			case 'N':
			case 'NW':
			case 'NE': 
				this.hide();
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
			part 		= 'ey',
			style 		= this._container._container.data('eye_style'),
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