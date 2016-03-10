var CharacterPart = IgeEntity.extend({
	classId: 'CharacterPart',

	init: function () {
		var self = this;

		IgeEntity.prototype.init.call(this);

		//Create the entity
		this.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(this._depthTemp)
			.anchor(0, this._container.data('anchorY'));

		//Init the object texture
		this.setTexture();

		//Initilize the animations
		this.animation.define('wlk_NE', this.getWalkingAnimation('0'), $CHARACTER_FPS, -1)
			.animation.define('wlk_NW', this.getWalkingAnimation('0'), $CHARACTER_FPS, -1)
			.animation.define('wlk_W',  this.getWalkingAnimation('1'), $CHARACTER_FPS, -1)
			.animation.define('wlk_E',  this.getWalkingAnimation('1'), $CHARACTER_FPS, -1)
			.animation.define('wlk_SW', this.getWalkingAnimation('2'), $CHARACTER_FPS, -1)
			.animation.define('wlk_SE', this.getWalkingAnimation('2'), $CHARACTER_FPS, -1)
			.animation.define('wlk_S',  this.getWalkingAnimation('3'), $CHARACTER_FPS, -1)
			.animation.define('wlk_N',  this.getWalkingAnimation('7'), $CHARACTER_FPS, -1);

		//Listen for numerous events that fire off.
		this._container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		this._container.on('onChangedAnimation', function (anim, dir) { self.changedAnimation(anim, dir); });
		this._container.on('onRest', function() { self.rest(); });

		//Finally mount to the Character container
		this.mount(this._container);
	},

	changedAnimation: function(animation, dir) {
		if(animation == 'walk') {
			animation = 'wlk';
			this.animation.select(animation + '_' + dir);
		}
	},

	changedDirection: function(container, direction) {
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

	setTexture: function(dir, subDir) {
		if(dir === undefined)
			dir = '3';
		if(subDir === undefined)
			subDir = 0;

		dir = this.directionToInt(dir);

		var	start 		= 'h',
			action		= 'std',
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

	rest: function() {
		this.animation.stop();
	},
});