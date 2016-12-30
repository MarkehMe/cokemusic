var ROOMS = {
	'studio_model_a' : {
		'width' : 6,
		'height' : 10,
		'x_offset' : 72,
		'y_offset' : -50,
		'x_anchor' : 0,
		'y_anchor' : 48,

		'player_start' : {
			'x' : 1,
			'y' : 0,
		},

		'background' : 'studio_model_a.png',
		'scale' : 1,
	},

	'studio_model_b' : {
		'width' : 10,
		'height' : 10,
		'x_offset' : 0,
		'y_offset' : -100,
		'x_anchor' : 0,
		'y_anchor' : 70,
		'background' : 'studio_model_b.png',
		'scale' : 1,

		'blocked_tiles' : [
			{ 'x' : 0, 'y': 0 },
			{ 'x' : 0, 'y': 1 },
			{ 'x' : 0, 'y': 2 },
			{ 'x' : 0, 'y': 3 },
			{ 'x' : 1, 'y': 0 },
			{ 'x' : 1, 'y': 1 },
			{ 'x' : 1, 'y': 2 },
			{ 'x' : 1, 'y': 3 },
			{ 'x' : 2, 'y': 0 },
			{ 'x' : 2, 'y': 1 },
			{ 'x' : 2, 'y': 2 },
			{ 'x' : 2, 'y': 3 },
			{ 'x' : 3, 'y': 0 },
			{ 'x' : 3, 'y': 1 },
			{ 'x' : 3, 'y': 2 },
			{ 'x' : 3, 'y': 3 },
		],

		'player_start' : {
			'x' : 5,
			'y' : 0,
		},
	},

	'studio_model_c' : {
		'width' : 6,
		'height' : 6,
		'x_offset' : 0,
		'y_offset' : 0,
		'x_anchor' : 0,
		'y_anchor' : 64,

		'player_start' : {
			'x' : 1,
			'y' : 0,
		},

		'background' : 'studio_model_c.png',
		'scale' : 1,
	},

	'studio_model_d' : {
		'width' : 8,
		'height' : 10,
		'x_offset' : 0,
		'y_offset' : -72,
		'x_anchor' : -31,
		'y_anchor' : 29,
		'background' : 'studio_model_b.png',
		'scale' : 1,

		'blocked_tiles' : [
			{ 'x' : 6, 'y': 6 },
			{ 'x' : 6, 'y': 7 },
			{ 'x' : 6, 'y': 8 },
			{ 'x' : 6, 'y': 9 },
			{ 'x' : 7, 'y': 6 },
			{ 'x' : 7, 'y': 7 },
			{ 'x' : 7, 'y': 8 },
			{ 'x' : 7, 'y': 9 },
		],

		'player_start' : {
			'x' : 1,
			'y' : 0,
		},
	},

	'studio_model_rooftop' : {
		'width' : 8,
		'height' : 10,
		'x_offset' : 0,
		'y_offset' : -100,
		'x_anchor' : 2,
		'y_anchor' : 56,
		'background' : 'Studio_Rooftop_with_Grid_256.png',
		'scale' : 1,
		'draw_floor': false,

		'blocked_tiles' : [
			{ 'x' : 0, 'y': 0 },
			{ 'x' : 0, 'y': 1 },
			{ 'x' : 0, 'y': 2 },
			{ 'x' : 0, 'y': 3 },
			{ 'x' : 1, 'y': 0 },
			{ 'x' : 1, 'y': 1 },
			{ 'x' : 1, 'y': 2 },
			{ 'x' : 1, 'y': 3 },
			{ 'x' : 2, 'y': 0 },
			{ 'x' : 2, 'y': 1 },
			{ 'x' : 2, 'y': 2 },
			{ 'x' : 2, 'y': 3 },
			{ 'x' : 3, 'y': 0 },
			{ 'x' : 3, 'y': 1 },
			{ 'x' : 3, 'y': 2 },
			{ 'x' : 3, 'y': 3 },
		],

		'player_start' : {
			'x' : 5,
			'y' : 0,
		},
	},

	'studio_wayne' : {
		'width' : 10,
		'height' : 10,
		'x_offset' : 0,
		'y_offset' : -100,
		'x_anchor' : 2,
		'y_anchor' : 56,
		'background' : 'wayne_ent_4.png',
		'scale' : 1,
		'draw_floor': false,

		'blocked_tiles' : [
			{ 'x' : 0, 'y': 0 },
			{ 'x' : 0, 'y': 1 },
			{ 'x' : 0, 'y': 2 },
			{ 'x' : 0, 'y': 3 },
			{ 'x' : 1, 'y': 0 },
			{ 'x' : 1, 'y': 1 },
			{ 'x' : 1, 'y': 2 },
			{ 'x' : 1, 'y': 3 },
			{ 'x' : 2, 'y': 0 },
			{ 'x' : 2, 'y': 1 },
			{ 'x' : 2, 'y': 2 },
			{ 'x' : 2, 'y': 3 },
			{ 'x' : 3, 'y': 0 },
			{ 'x' : 3, 'y': 1 },
			{ 'x' : 3, 'y': 2 },
			{ 'x' : 3, 'y': 3 },
		],

		'player_start' : {
			'x' : 5,
			'y' : 0,
		},
	},
};