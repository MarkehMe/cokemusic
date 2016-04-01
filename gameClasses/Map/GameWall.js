var GameWall = IgeTileMap2d.extend({
	classId: 'GameWall',

	init: function() {
		IgeTileMap2d.prototype.init.call(this);
		this._localMatrix = new GameWallMatrix2d();
	},
});