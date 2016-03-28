// Define our player character head container classes
var CharacterHead = CharacterPart.extend({
	classId: 'CharacterHead',

	init: function (container) {
		var self = this;
		self._part = 'hd';
		self._depthTemp = 3;
		self._style = container.data('head_style');
		self._container = container;

		CharacterPart.prototype.init.call(this);

		//Spawn the hair
		self.hair = new CharacterHair(self);

		//Spawn the eyes
		self.eyes = new CharacterEyes(self);

		//Spawn the mouth
		self.mouth = new CharacterMouth(self);
	},
});