var CharacterShoes = CharacterPart.extend({
	classId: 'CharacterShoes',

	init: function (container) {
		var self = this;
		self._part = 'sh';
		self._depthTemp = 2;
		self._style = container.data('shoe_style');
		self._container = container;

		CharacterPart.prototype.init.call(this);
	},
});