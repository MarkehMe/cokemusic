var CharacterPart = IgeEntity.extend({
	classId: 'CharacterPart',

	init: function () {
		var self = this;

		IgeEntity.prototype.init.call(this);

		if(this._depthTemp === undefined)
			this._depthTemp = 0;

		//Create the entity
		this.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(this._depthTemp)
			.anchor(0, this._container.data('anchorY'));

		//Init the object texture
		this.setTexture();

		//Initilize the animations
		if(this._customFPS !== undefined)
			$fps = this._customFPS;
		else
			$fps = $CHARACTER_FPS;

		//Walking animations
		if(typeof self.defineWalkingAnimations != 'function') {
			this.animation.define('wlk_NE', this.getWalkingAnimation('0'), $fps, -1)
				.animation.define('wlk_NW', this.getWalkingAnimation('0'), $fps, -1)
				.animation.define('wlk_W',  this.getWalkingAnimation('1'), $fps, -1)
				.animation.define('wlk_E',  this.getWalkingAnimation('1'), $fps, -1)
				.animation.define('wlk_SW', this.getWalkingAnimation('2'), $fps, -1)
				.animation.define('wlk_SE', this.getWalkingAnimation('2'), $fps, -1)
				.animation.define('wlk_S',  this.getWalkingAnimation('3'), $fps, -1)
				.animation.define('wlk_N',  this.getWalkingAnimation('7'), $fps, -1);
		} else {
			this.defineWalkingAnimations();
		}

		//Sitting animations
		if(typeof self.defineSittingAnimations != 'function') {
			this.animation.define('sit_NE', this.getSittingAnimation('0'), $fps, -1)
				.animation.define('sit_NW', this.getSittingAnimation('0'), $fps, -1)
				.animation.define('sit_W',  this.getSittingAnimation('1'), $fps, -1)
				.animation.define('sit_E',  this.getSittingAnimation('1'), $fps, -1)
				.animation.define('sit_SW', this.getSittingAnimation('2'), $fps, -1)
				.animation.define('sit_SE', this.getSittingAnimation('2'), $fps, -1)
				.animation.define('sit_S',  this.getSittingAnimation('3'), $fps, -1)
				.animation.define('sit_N',  this.getSittingAnimation('7'), $fps, -1);
		} else {
			this.defineSittingAnimations();
		}

		//Carrying
		this.animation.define('crr_NE', this.getCarryAnimation('0'), $fps, -1)
			.animation.define('crr_NW', this.getCarryAnimation('0'), $fps, -1)
			.animation.define('crr_W',  this.getCarryAnimation('1'), $fps, -1)
			.animation.define('crr_E',  this.getCarryAnimation('1'), $fps, -1)
			.animation.define('crr_SW', this.getCarryAnimation('2'), $fps, -1)
			.animation.define('crr_SE', this.getCarryAnimation('2'), $fps, -1)
			.animation.define('crr_S',  this.getCarryAnimation('3'), $fps, -1)
			.animation.define('crr_N',  this.getCarryAnimation('7'), $fps, -1);

		//Drinking
		this.animation.define('drk_NE', this.getDrinkingAnimation('0'), $CHARACTER_DRINK_FPS, -1)
			.animation.define('drk_NW', this.getDrinkingAnimation('0'), $CHARACTER_DRINK_FPS, -1)
			.animation.define('drk_W',  this.getDrinkingAnimation('1'), $CHARACTER_DRINK_FPS, -1)
			.animation.define('drk_E',  this.getDrinkingAnimation('1'), $CHARACTER_DRINK_FPS, -1)
			.animation.define('drk_SW', this.getDrinkingAnimation('2'), $CHARACTER_DRINK_FPS, -1)
			.animation.define('drk_SE', this.getDrinkingAnimation('2'), $CHARACTER_DRINK_FPS, -1)
			.animation.define('drk_S',  this.getDrinkingAnimation('3'), $CHARACTER_DRINK_FPS, -1)
			.animation.define('drk_N',  this.getDrinkingAnimation('7'), $CHARACTER_DRINK_FPS, -1);

		//Listen for numerous events that fire off.
		this._container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		this._container.on('onChangedAnimation', function (anim, dir) { self.changedAnimation(anim, dir); });
		this._container.on('onRest', function(dir) { self.rest(dir); });

		//Finally mount to the Character container
		this.mount(this._container);
	},

	changedAnimation: function(animation, dir) {
		if(animation == 'walk') {
			animation = 'wlk';
			this.animation.select(animation + '_' + dir);
		} else if(animation == 'sit') {

			//Make sure this isnt an arm
			if(this._part == 'ls' || this._part == 'rs' || this._part == 'lh' || this._part == 'rh'){
				this.animation.stop();
				this.setTexture(ige.player._currentDirection);
				return;
			}

			animation = 'sit';
			this.animation.select(animation + '_' + dir);
		} else if(animation == 'carry') {

		} else if(animation == 'drink') {

		} else if(animation == 'stand') {
			//this.stand(dir);
		}
	},

	changedDirection: function(container, direction) {
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
				this.setTexture(7);  
			break;	
		}
	},

	setTexture: function(dir, subDir, action) {
		if(dir === undefined)
			dir = '3';
		if(subDir === undefined)
			subDir = 0;
		if(action === undefined)
			action = 'std';

		dir = this.directionToIntRelative(dir);

		if(this._action !== undefined)
			action = this._action;

		var	start 		= 'h',
			action		= action,
			part 		= this._part,
			style 		= this._style,
			direction 	= dir,
			subsection  = subDir;

		//Set the texture
		this.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png')
			.dimensionsFromCell();
	},

	stand: function(dir, subDir) {
		if(dir === undefined)
			dir = '3';
		if(subDir === undefined)
			subDir = 0;
		
		action = 'std';

		dir = this.directionToIntRelative(dir);

		var	start 		= 'h',
			action		= action,
			part 		= this._part,
			style 		= this._style,
			direction 	= dir,
			subsection  = subDir;

		//Set the texture
		this.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png')
			.dimensionsFromCell();
	},

	directionToInt : function(dir) {
		switch(dir) {
			case 'NE': return '0';
			case 'E': return '1';
			case 'SE': return '2';
			case 'S': return '3';
			case 'SW': return '4';
			case 'W': return '5';
			case 'NW': return '6';
			case 'N': return '7';
			default: return dir;
		}
	},

	directionToIntRelative: function(dir) {
		switch(dir) {
			case 'NW': 
			case 'NE': 
				return 0;  
			break;

			case 'W' :
			case 'E' : 
				return 1;
			break;

			case 'SW':
			case 'SE' : 
				return 2;
			break;

			case 'S' : 
				return 3;
			break;

			case 'N' : 
				return 7;
			break;	
			default: return dir;
		}
	},

	getWalkingAnimation: function(vDir) {
		var frames = [], start, action, part, style, direction, subsection;

		for (var i = 0; i < ANIMATION_FRAMES['wlk'].length; i++) {
			start 		= 'h',
			action		= 'wlk',
			part 		= this._part,
			style 		= this._style,
			direction 	= vDir,
			subsection  = ANIMATION_FRAMES['wlk'][i];

			frames.push(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png');
		}

		return frames;
	},


	getSittingAnimation: function(vDir) {
		var frames = [], start, action, part, style, direction, subsection;

		for (var i = 0; i < ANIMATION_FRAMES['sit'].length; i++) {
			start 		= 'h',
			action		= 'sit',
			part 		= this._part,
			style 		= this._style,
			direction 	= vDir,
			subsection  = ANIMATION_FRAMES['sit'][i];

			frames.push(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png');
		}

		return frames;
	},

	getCarryAnimation: function(vDir) {
		var frames = [], start, action, part, style, direction, subsection;

		for (var i = 0; i < ANIMATION_FRAMES['carry'].length; i++) {
			start 		= 'h',
			action		= 'crr',
			part 		= this._part,
			style 		= this._style,
			direction 	= vDir,
			subsection  = ANIMATION_FRAMES['carry'][i];

			frames.push(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png');
		}

		return frames;
	},

	getDrinkingAnimation: function(vDir) {
		var frames = [], start, action, part, style, direction, subsection;

		//Get the carry animations because carry + drink go together.
		frames = frames.concat(this.getCarryAnimation(vDir));

		for (var i = 0; i < ANIMATION_FRAMES['drink'].length; i++) {
			start 		= 'h',
			action		= 'drk',
			part 		= this._part,
			style 		= this._style,
			direction 	= vDir,
			subsection  = ANIMATION_FRAMES['drink'][i];

			frames.push(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png');
		}

		return frames;
	},

	rest: function(vDir) {
		this.animation.stop();

		this.setTexture(vDir, undefined, 'std');
	},

	setColor: function(colorSelection) {
		this._texture.applyFilter(IgeFilters.colorOverlay, {color: colorSelection});
	}
});