var CharacterCarry = CharacterPart.extend({
	classId: 'CharacterCarry',

	init: function (container) {
		var self = this;
		self._action = 'crr';
		self._part = 'ri';
		self._depthTemp = 4;
		self._style = '001';
		self._customFPS = $CHARACTER_DRINK_FPS;
		self._container = container;

		self._container.on('onCarryStart', function () { self.carryStart(); });
		self._container.on('onCarryStop', function () { self.carryStop(); });

		CharacterPart.prototype.init.call(this);
		this.hide();
	},

	carryStart: function() {
		this.show();
	},

	carryStop: function() {
		this.animation.stop();
		this.hide();
	},

	changedDirection: function(container, direction) {
		if(ige.player._drink == true || ige.player._carry == true)
			this.show();

		if(direction === undefined)
			direction = ige.player._currentDirection;
		
		this._scale.x = 1;

		switch(direction) {
			case 'NW': this._scale.x = -1; 	
			case 'NE': 
				this.setTexture(0);  
			break;

			case 'W' : this._scale.x = -1; 	
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
				//this.setTexture(7);  
				this.hide();
			break;	
		}
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

});	