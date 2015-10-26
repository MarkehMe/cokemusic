var FloorTextureMap = IgeTextureMap.extend({
	classId: 'FloorTextureMap',

	/**
	 * Sets the specified tile's texture index and cell that will be used
	 * when rendering the texture map.
	 * @param {Number} x The tile x co-ordinate.
	 * @param {Number} y The tile y co-ordinate.
	 * @param {Number} textureIndex The texture index.
	 * @param {Number} cell The cell index.
	 * @param {String} hex value of the color to use as an overlay.
	 */
	paintTile: function (x, y, textureIndex, cell, multiply) {
		if (x !== undefined && y !== undefined && textureIndex !== undefined) {
			if (cell === undefined || cell < 1) {
				cell = 1; // Set the cell default to 1
			}
			this.map.tileData(x, y, [textureIndex, cell]);
		}
	},

});