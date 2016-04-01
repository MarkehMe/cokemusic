var CharacterLeftArm = CharacterPart.extend({
	classId: 'CharacterLeftArm',

	init: function (container) {
		var self = this;
		self._part = 'lh';
		self._depthTemp = 3;
		self._style = '001';
		self._customFPS = $CHARACTER_FPS / 2;
		self._container = container;
		self.defineWalkingAnimations = function() {
			this.animation.define('wlk_NE', this.getWalkingAnimation('0'), $fps, -1)
				.animation.define('wlk_NW', this.getWalkingAnimation('0'), $fps, -1)
				.animation.define('wlk_E',  this.getWalkingAnimation('1'), $fps, -1)
				.animation.define('wlk_SW', this.getWalkingAnimation('2'), $fps, -1)
				.animation.define('wlk_SE', this.getWalkingAnimation('2'), $fps, -1)
				.animation.define('wlk_S',  this.getWalkingAnimation('3'), $fps, -1)
				.animation.define('wlk_N',  this.getWalkingAnimation('7'), $fps, -1);

			//Have to flip the walking W direction
			this._part = 'rh';
			this.animation.define('wlk_W',  this.getWalkingAnimation('1'), $fps, -1)
			this._part = 'lh';
		};

		CharacterPart.prototype.init.call(this);
	},

	changedAnimation: function(animation, dir) {
		CharacterPart.prototype.changedAnimation.call(this, animation, dir);
	},

	changedDirection: function(container, direction) {
		this._scale.x = 1;
		this._part = 'lh';
		this.show();

		switch(direction) {
			case 'NW': this._scale.x = -1; 	
			case 'NE': 
				this.setTexture(0);  
			break;

			case 'W' : 
				this._part = 'rh';
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
	},

	getWalkingAnimation: function(vDir) {
		var frames = [], start, action, part, style, direction, subsection;

		for (var i = 0; i < ANIMATION_FRAMES['wlk_arm'].length; i++) {
			start 		= 'h',
			action		= 'wlk',
			part 		= this._part,
			style 		= '001',
			direction 	= vDir,
			subsection  = ANIMATION_FRAMES['wlk_arm'][i];

			frames.push(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png');
		}

		return frames;
	},
});