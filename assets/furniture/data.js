var FURNITURE = {
	//37 = V Coke
	//54 = BLOCK
	//56 = Bookshelf
	//120 = Polar Bear
	//125 Pinball
	//114 = Pinball
	//123 = Stereo thing
	//126 = Plant
	//112 = Stool
	//109 = StandingSpeaker
	//105 = Grundge Table
	//103 = northern table
	//102 = ocean table
	//101 = mic
	//100 = box

	//FRIDGE
	'fridge' : {
		'info': {
			'icon' : 'northern_minibar.png',
			'title' : 'Mini Fridge',
			'description' : "I'm coolin' fam.",
			'height' : '20',
			'stackable' : false,
			'counter' : true
		},
		'offsets': {
			'NW': [2, 0, -3, 1, 1],
			'NE': [1, 0, -3, 1, 1],
			'SE': [2, 0, -3, 1, 1],
			'SW': [1, 0, -3, 1, 1]
		}
	},

	//NORTHERN STEREO
	'n_stereo' : {
		'info': {
			'icon' : '5001_stereo_small.png',
			'title' : 'Northern Stereo',
			'description' : "Loud as fuck.",
			'height' : '45',
			'stackable' : false,
			'counter' : false
		},
		'offsets': {
			'NW': [3, 0, -4, 1, 1],
			'NE': [4, 0, -4, 1, 1],
			'SE': [3, 0, -4, 1, 1],
			'SW': [4, 0, -4, 1, 1]
		}
	},

	//NORTHERN STOOL
	'n_stool' : {
		'info': {
			'icon' : '5001_stool_small.png',
			'title' : 'Northern Stool',
			'description' : "A stool for kids at a BBQ.",
			'height' : '20',
			'stackable' : false,
			'counter' : false
		},
		'offsets': {
			'NW': [7, 0, 2, 1, 1],
			'NE': [8, 0, 0, 1, 1],
			'SE': [5, 0, 0, 1, 1],
			'SW': [6, 0, 0, 1, 1]
		}
	},

	//NORTHERN TABLE
	'n_table' : {
		'info': {
			'icon' : '5001_table_small.png',
			'title' : 'Northern Table',
			'description' : "A table.",
			'height' : '20',
			'stackable' : false,
			'counter' : false
		},
		'offsets': {
			'NW': [9, 0, 0, 2, 2],
			'NE': [9, 0, 0, 2, 2],
			'SE': [9, 0, 0, 2, 2],
			'SW': [9, 0, 0, 2, 2]
		}
	},

	//SOFA COKE
	'sofa_coke' : {
		'info': {
			'icon' : 'sofa_coke.png',
			'title' : 'Class Coke Sofa',
			'description' : 'Never forget homies.',
			'height' : '20',
			'stackable' : false,
			'counter' : false
		},
		'offsets': {
			'NW': [22, -3, -5, 1, 2],
			'NE': [20, 3, -3, 2, 1],
			'SE': [10, 0, -10, 1, 2],
			'SW': [21, 0, -10, 2, 1]
		}
	},

	//STANDING LAMP
	'standing_lamp' : {
		'info': {
			'icon' : '5001_light_small.png',
			'title' : 'Standing Lamp',
			'description' : 'Brighter than the sun.',
			'height' : '45',
			'stackable' : false,
			'counter' : false
		},
		'offsets': {
			'NW': [12, -1, 4, 1, 1],
			'NE': [12, -1, 4, 1, 1],
			'SE': [12, -1, 4, 1, 1],
			'SW': [12, -1, 4, 1, 1]
		}
	},

	//Mini Coke Fridge
	'mini_coke_fridge' : {
		'info': {
			'icon' : 'coolcase_small.png',
			'title' : 'Mini Coke Fridge',
			'description' : 'Enough space to fit one whole coke can.',
			'height' : '20',
			'stackable' : false,
			'counter' : true
		},
		'offsets': {
			'NW': [13, 0, 0, 1, 1],
			'NE': [55, 2, 0, 1, 1],
			'SE': [13, 0, 0, 1, 1],
			'SW': [55, 2, 0, 1, 1]
		}
	},

	//Northern Sofa
	'northern_sofa' : {
		'info': {
			'icon' : 'northern_sofa_small.png',
			'title' : 'Northern Sofa',
			'description' : 'Northern Sofa Description.',
			'height' : '30',
			'stackable' : false,
			'counter' : false
		},
		'offsets': {
			'NW': [118, 0, 0, 1, 2],
			'NE': [14, 0, 0, 2, 1],
			'SE': [116, 0, 0, 1, 2],
			'SW': [117, 2, 0, 2, 1]
		}
	},

	//Rack
	'rack' : {
		'info': {
			'icon' : 'rack1_small.png',
			'title' : 'Rack',
			'description' : 'No idea what this thing does.',
			'height' : '40',
			'stackable' : true,
			'counter' : false
		},
		'offsets': {
			'NW': [124, 0, 0, 1, 1],
			'NE': [15, 0, 0, 1, 1],
			'SE': [122, 0, 0, 1, 1],
			'SW': [123, 2, 0, 1, 1]
		}
	},

	//Fur Rug
	'fur_rug' : {
		'info': {
			'icon' : 'rug3_small.png',
			'title' : 'Fur Rug',
			'description' : "Wow, this rug feels amazing. It's made out of dead animals.",
			'height' : '10',
			'rug'		: true,
			'stackable' : false,
			'counter' 	: false
		},
		'offsets': {
			'NW': [16, 0, 0, 3, 3],
			'NE': [16, 0, 0, 3, 3],
			'SE': [16, 0, 0, 3, 3],
			'SW': [16, 2, 0, 3, 3]
		}
	},

	//Round Stereo
	'round_stereo' : {
		'info': {
			'icon' : 'speaker1_small.png',
			'title' : 'Round Stereo',
			'description' : "No description is needed for this penis.",
			'height' : '57',
			'stackable' : false,
			'counter' 	: false
		},
		'offsets': {
			'NW': [26, 0, 0, 1, 1],
			'NE': [25, 0, 0, 1, 1],
			'SE': [23, 0, 0, 1, 1],
			'SW': [24, -2, 0, 1, 1]
		}
	},

	//Garbage Can
	'trashcan' : {
		'info': {
			'icon' : 'trashcan_small.png',
			'title' : 'Trash Can',
			'description' : "If you look closely you can someone through out their ex.",
			'height' : '33',
			'stackable' : false,
			'counter' 	: false
		},
		'offsets': {
			'NW': [27, 0, 0, 1, 1],
			'NE': [28, 0, 0, 1, 1],
			'SE': [27, 0, 0, 1, 1],
			'SW': [28, 0, 0, 1, 1]
		}
	},

	//Treasure Chest
	'treasure_chest' : {
		'info': {
			'icon' : 'treasurechest_small.png',
			'title' : 'Treasure Chest',
			'description' : "I'm rich bitch!",
			'height' : '20',
			'stackable' : false,
			'counter' 	: false
		},
		'offsets': {
			'NW': [36, 5, 0, 1, 1],
			'NE': [35, -5, 0, 1, 1],
			'SE': [30, -5, 0, 1, 1],
			'SW': [29, 5, 0, 1, 1]
		}
	},

	//TV
	'tv': {
		'info': {
			'icon' : 'tv.png',
			'title' : 'A badass TV',
			'description' : "This TV does not turn on that's why it's so badass.",
			'height' : '20',
			'stackable' : false,
			'counter' : true
		},
		'offsets': {
			'NW': [34, 0, 0, 1, 1],
			'NE': [33, 0, 0, 1, 1],
			'SE': [34, 0, 0, 1, 1],
			'SW': [33, 0, 0, 1, 1]
		}
	},
}