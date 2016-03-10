var CharacterPants = CharacterPart.extend({
	classId: 'CharacterPants',

	init: function (container) {
		var self = this;
		self._part = 'lg';
		self._depthTemp = 2;
		self._style = container.data('pant_style');
		self._container = container;

		CharacterPart.prototype.init.call(this);
	},
});