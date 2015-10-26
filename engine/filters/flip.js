IgeFilters.flip = function (canvas, ctx, originalImage, texture, data) {
	var w, h, canvasData;
	w = canvas.width;
	h = canvas.height;

	ctx.save();
	ctx.scale(-1, 1);
	ctx.restore();

	canvasData = ctx.getImageData(0, 0, w, h);

	ctx.putImageData(canvasData, 0, 0);
};