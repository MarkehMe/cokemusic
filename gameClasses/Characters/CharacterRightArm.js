var CharacterRightArm = CharacterPart.extend({
	classId: 'CharacterRightArm',

	init: function (container) {
		var self = this;
		self._part = 'rh';
		self._depthTemp = 4;
		self._style = '001';
		self._customFPS = $CHARACTER_FPS / 2;
		self._container = container;
		this._container.on('onCarryStop', function () { self.carryStop(); });

		CharacterPart.prototype.init.call(this);
	},

	carryStop: function() {
		this._action = undefined;
		this.changedDirection(this._container, ige.player._currentDiretion);
	},

	changedAnimation: function(animation, dir) {
		if(animation == 'carry') {
			animation = 'crr';
			this._action = 'crr';
			this.animation.select(animation + '_' + dir);
		} else if(animation == 'drink') {
			animation = 'drk';
			this._action = 'drk';
			this.animation.select(animation + '_' + dir);
		}

		if(ige.player._carry != true) {
			CharacterPart.prototype.changedAnimation.call(this, animation, dir);
		}
	},

	changedDirection: function(container, direction) {
		this._scale.x = 1;
		this.show();
		//this.depth(this._depthTemp);	

		switch(direction) {
			case 'NW': this._scale.x = -1; 	
			case 'NE': 
				this.setTexture(0);  
			break;

			case 'W' : 
				//Eventually we need to make it where the this is visible
				//there are animations for it
				this.hide();
				// this.depth(1);	
				// this._scale.x = -1; 
				// this.setTexture(1);
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