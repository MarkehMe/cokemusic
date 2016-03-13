var CharacterBody = CharacterPart.extend({
	classId: 'CharacterBody',

	init: function (container) {
		var self = this;
		self._part = 'bd';
		self._depthTemp = 0;
		self._style = container.data('style');
		self._container = container;

		CharacterPart.prototype.init.call(this);
	},
});