// Define our player character head container classes
var CharacterPants = CharacterPart.extend({
	classId: 'CharacterPants',

	init: function (container) {
		var self = this, fps;
		self._part = 'lg';
		self._depthTemp = 2;
		self._style = container.data('pant_style');
		self._container = container;

		CharacterPart.prototype.init.call(this);
	},

	getWalkingAnimation: function(vDir) {
		var frames = [], start, action, part, style, direction, subsection;

		for (var i = 0; i < ANIMATION_FRAMES['wlk'].length; i++) {
			start 		= 'h',
			action		= 'wlk',
			part 		= this._part,
			style 		= this._container.data('pant_style'),
			direction 	= vDir,
			subsection  = ANIMATION_FRAMES['wlk'][i];

			frames.push(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png');
		}

		return frames;
	},

	rest: function() {
		this.animation.stop();
	},

	setColor: function(colorSelection) {
		//'rgba(0, 0, 255, 0.5)'
		this._texture.applyFilter(IgeFilters.colorOverlay, {color: colorSelection});
	}
});