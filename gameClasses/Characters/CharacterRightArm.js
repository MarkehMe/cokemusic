// Define our player character head container classes
var CharacterRightArm = IgeEntity.extend({
	classId: 'CharacterRightArm',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (body)
		self._container = container;
		self._part = 'rh';

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(3)
			.anchor(0, container.data('anchorY'));

		self.setTexture();

		//Initilize the animations
		fps = $CHARACTER_FPS / 2;
		this.animation.define('wlk_NE', self.getWalkingAnimation('0'), fps, -1)
			.animation.define('wlk_NW', self.getWalkingAnimation('0'), fps, -1)
			.animation.define('wlk_W',  self.getWalkingAnimation('1'), fps, -1)
			.animation.define('wlk_E',  self.getWalkingAnimation('1'), fps, -1)
			.animation.define('wlk_SW', self.getWalkingAnimation('2'), fps, -1)
			.animation.define('wlk_SE', self.getWalkingAnimation('2'), fps, -1)
			.animation.define('wlk_S',  self.getWalkingAnimation('3'), fps, -1)
			.animation.define('wlk_N',  self.getWalkingAnimation('7'), fps, -1);

		// //Standing Animations
		// this.animation.define('standNE', [30], fps, -1)
		//  .animation.define('standNW', [32], fps, -1)
		// 	.animation.define('standE',  [34], fps, -1)
		// 	.animation.define('standSW', [36], fps, -1)
		// 	.animation.define('standSE', [37], fps, -1)
		// 	.animation.define('standS',  [42], fps, -1)
		// 	.animation.define('standN',  [40], fps, -1);


		//Listen for the changeDirection event so we can change
		//the heads animation
		container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		container.on('onChangedAnimation', function (anim, dir) { self.changedAnimation(anim, dir); });
		container.on('onRest', function() { self.rest(); });

		//Finally mount to the container (body)
		self.mount(container);
	},

	changedAnimation: function(animation, dir) {
		if(animation == 'walk') {
			animation = 'wlk';
			this.animation.select(animation + '_' + dir);
		}
	},

	changedDirection: function(container, direction) {
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
			dir = '3';
		if(subDir === undefined)
			subDir = 0;

		dir = this._container.directionToInt(dir);
		
		var	start 		= 'h',
			action		= 'std',
			part 		= 'rh',
			style 		= '001',//this._container.data('style'),
			direction 	= dir,
			subsection  = subDir;

		this.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png')
			.dimensionsFromCell();
	},

	getWalkingAnimation: function(vDir) {
		var frames = [], start, action, part, style, direction, subsection;

		for (var i = 0; i < ANIMATION_FRAMES['wlk_arm'].length; i++) {
			start 		= 'h',
			action		= 'wlk',
			part 		= this._part,
			style 		= '001',//this._container.data('style'),
			direction 	= vDir,
			subsection  = ANIMATION_FRAMES['wlk_arm'][i];

			frames.push(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png');
		}

		return frames;
	},

	rest: function() {

		this.animation.setFrame('stand' + this._container._currentDirection, 0);
		
		//this.animation.stop();
	},
});