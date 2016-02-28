var GameItemOffsets = {
	init: function(gameItem, direction) {
		if(typeof direction == 'undefined')
			direction = 'NW';

		return FURNITURE[gameItem]['offsets'][direction];
	}
};