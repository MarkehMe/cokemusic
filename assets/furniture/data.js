var FURNITURE = {
	//120 = Polar Bear
	//125 Pinball
	//114 = Pinball
	//123 = Stereo thing
	//126 = Plant
	//112 = Stool
	//109 = StandingSpeaker
	//105 = Grundge Table
	//102 = ocean table
	//101 = mic
	//100 = box

	/***
		@icon[string]		 - The small icon that is displayed in the inventory bag
					   	  	   and on the bottom right whenever an item is selected.
		@title[string] 		 - Title that is displayed when the item is selected.
		@description[string] - Information below the title.
		@height[int]		 - Height of the object in 3dbounds.
		@stackable[bool]	 - Can this item be stacked ontop of another item.
		@counter[bool]	 	 - Can this item be placed ontop of a table.
		@seat[bool] 		 - Can this item be sat in by a player.
		@table[bool]       	 - Can this item have items placed ontop of it.
		@rug[bool]			 - Is this item a rug that can have placed ontop of it.
	**/

	//FRIDGE
	'fridge' : {
		'info': {
			'icon' : '5001_minibar_small.png',
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
			'counter' : false,
			'seat': true,
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
			'counter' : false,
			'table'		: true
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
			'counter' : false,
			'seat': true,
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
			'NW': [12, -1, -5, 1, 1],
			'NE': [12, -1, -5, 1, 1],
			'SE': [12, -1, -5, 1, 1],
			'SW': [12, -1, -5, 1, 1]
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
			'counter' : false,
			'seat': true,
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
			'description' : "If you look closely you can someone threw out their ex.",
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

	//Northern Stereo
	'northern_stereo' : {
		'info': {
			'icon' : 'northern_stereo_small.png',
			'title' : 'Northern Stereo',
			'description' : "Handle with care, ty.",
			'height' : '55',
			'stackable' : false,
			'counter' 	: false
		},
		'offsets': {
			'NW': [18, -2, -3, 1, 1],
			'NE': [19, -2, -3, 1, 1],
			'SE': [18, -2, -3, 1, 1],
			'SW': [19, -2, -3, 1, 1]
		}
	},

	//V Coke bookshelf
	'v_coke_bookshelf' : {
		'info': {
			'icon' : 'vanillacokeshelf_small.png',
			'title' : 'Vanilla Coke Shelf',
			'description' : "Perfect for hiding drugs in.",
			'height' : '60',
			'stackable' : false,
			'counter' 	: false,
		},
		'offsets': {
			'NW': [38, 3, 2, 1, 2],
			'NE': [37, 3, 2, 2, 1],
			'SE': [38, 3, 2, 1, 2],
			'SW': [37, 3, 2, 2, 1]
		}
	},

	//V Coke
	'v_coke_table' : {
		'info': {
			'icon' : 'vanillacoketable_small.png',
			'title' : 'Vanilla Coke Table',
			'description' : "Perfect for doing drugs on.",
			'height' : '20',
			'stackable' : false,
			'counter' 	: false,
			'table'		: true
		},
		'offsets': {
			'NW': [50, -5, -6, 2, 2],
			'NE': [50, -5, -6, 2, 2],
			'SE': [50, -5, -6, 2, 2],
			'SW': [50, -5, -6, 2, 2]
		}
	},

	//Sponge Wall
	'sponge_wall' : {
		'info': {
			'icon' : 'seaspongebarrier_small.png',
			'title' : 'Sea Sponge Barrier',
			'description' : "Used to keep out the underwater zombies.",
			'height' : '95',
			'stackable' : false,
			'counter' 	: false
		},
		'offsets': {
			'NW': [31, -5, 0, 1, 1],
			'NE': [32, -5, 0, 1, 1],
			'SE': [31, -5, 0, 1, 1],
			'SW': [32, -5, 0, 1, 1]
		}
	},

	//Northern Side Table
	'northern_side_table' : {
		'info': {
			'icon' : '5001_ctable_small.png',
			'title' : 'Northern Side Table',
			'description' : "",
			'height' : '20',
			'stackable' : false,
			'counter' 	: false,
			'table'		: true
		},
		'offsets': {
			'NW': [39, -1, -3, 1, 1],
			'NE': [39, -1, -3, 1, 1],
			'SE': [39, -1, -3, 1, 1],
			'SW': [39, -1, -3, 1, 1]
		}
	},

	//Northern Stool
	'northern_stool' : {
		'info': {
			'icon' : 'northern_stool_small.png',
			'title' : 'Northern Stool',
			'description' : "",
			'height' : '10',
			'stackable' : false,
			'counter' 	: false,
			'seat': true,
		},
		'offsets': {
			'NW': [41, -1, -3, 1, 1],
			'NE': [42, -1, -3, 1, 1],
			'SE': [41, -1, -3, 1, 1],
			'SW': [42, -1, -3, 1, 1]
		}
	},

	//Sound Barrier
	'acoustopad' : {
		'info': {
			'icon' : 'acoustopad_small.png',
			'title' : 'Acousto Pad',
			'description' : "Blocks 100% of noise but only blocks 50% of talent.",
			'height' : '55',
			'scale': .9,
			'stackable' : false,
			'counter' 	: false,
		},
		'offsets': {
			'NW': [52, 1, 1, 2, 1],
			'NE': [43, 1, 1, 1, 2],
			'SE': [52, 1, 1, 2, 1],
			'SW': [43, 1, 1, 1, 2]
		}
	},

	//Aqurium
	'aquarium' : {
		'info': {
			'icon' : 'rectaquarium_small.png',
			'title' : 'Acousto Pad',
			'description' : "Blocks 100% of noise but only blocks 50% of talent.",
			'height' : '50',
			'stackable' : false,
			'counter' 	: false,
		},
		'offsets': {
			'NW': [44, -1, -3, 1, 1],
			'NE': [44, -1, -3, 1, 1],
			'SE': [44, -1, -3, 1, 1],
			'SW': [44, -1, -3, 1, 1]
		}
	},

	//Beanbag
	'beanbag' : {
		'info': {
			'icon' : 'beanbag_small.png',
			'title' : 'Cow Bean Bag',
			'description' : "Looks fucking sick but hurts the shit out of your back.",
			'height' : '30',
			'stackable' : false,
			'counter' 	: false,
			'seat': true,
		},
		'offsets': {
			'NW': [47, -1, -3, 1, 1],
			'NE': [48, -1, -3, 1, 1],
			'SE': [46, -1, -3, 1, 1],
			'SW': [45, -1, -3, 1, 1]
		}
	},

	//Block
	'block' : {
		'info': {
			'icon' : 'blocks_small.png',
			'title' : 'Block',
			'description' : "Stops people.",
			'height' : '30',
			'stackable' : true,
			'counter' 	: false,
			'table'		: true,
		},
		'offsets': {
			'NW': [54, -1, -3, 1, 2],
			'NE': [53, -1, -3, 2, 1],
			'SE': [54, -1, -3, 1, 2],
			'SW': [53, -1, -3, 2, 1]
		}
	},

	//Bookshelf
	'bookshelf' : {
		'info': {
			'icon' : 'dorm_bookshelf_small.png',
			'title' : 'Bookshelf',
			'description' : "A bookshelf with no books #study",
			'height' : '40',
			'stackable' : false,
			'counter' 	: false,
		},
		'offsets': {
			'NW': [56, 0, -2, 1, 2],
			'NE': [57, 0, -2, 2, 1],
			'SE': [56, 0, -2, 1, 2],
			'SW': [57, 0, -2, 2, 1]
		}
	},

	//Lamp
	'lamp' : {
		'info': {
			'icon' : 'dorm_light_small.png',
			'title' : 'Dorm Light',
			'description' : "Dorm light because your future is so bright.",
			'height' : '80',
			'stackable' : false,
			'counter' 	: true,
		},
		'offsets': {
			'NW': [58, 0, -4, 1, 1],
			'NE': [58, 0, -4, 1, 1],
			'SE': [58, 0, -4, 1, 1],
			'SW': [58, 0, -4, 1, 1]
		}
	},

	//Oster Sofa
	'oster_sofa' : {
		'info': {
			'icon' : 'oystercouch_small.png',
			'title' : 'Oster Sofa',
			'description' : "The tiny legs on this sofa can only support up to 250lbs.",
			'height' : '40',
			'stackable' : false,
			'counter' 	: false,
			'seat'		: true,
		},
		'offsets': {
			'NW': [59, 0, -4, 1, 2],
			'NE': [68, 0, -4, 2, 1],
			'SE': [69, 0, -4, 1, 2],
			'SW': [70, 0, -4, 2, 1]
		}
	},

	//Oster Sofa
	'eye_lamp' : {
		'info': {
			'icon' : 'oystercouch_small.png',
			'title' : 'Oster Sofa',
			'description' : "The tiny legs on this sofa can only support up to 250lbs.",
			'height' : '40',
			'stackable' : false,
			'counter' 	: false,
			'seat'		: true,
		},
		'offsets': {
			'NW': [59, 0, -4, 1, 2],
			'NE': [68, 0, -4, 2, 1],
			'SE': [69, 0, -4, 1, 2],
			'SW': [70, 0, -4, 2, 1]
		}
	},

	//Dorm Couch
	'dorm_couch' : {
		'info': {
			'icon' : 'dorm_couch_small.png',
			'title' : 'Dorm Couch',
			'description' : "Someone had sex on this couch.",
			'height' : '30',
			'stackable' : false,
			'counter' 	: false,
			'seat': true,
		},
		'offsets': {
			'NW': [62, -1, -3, 1, 2],
			'NE': [63, -1, -3, 2, 1],
			'SE': [60, -1, -3, 1, 2],
			'SW': [61, -1, -3, 2, 1]
		}
	},

	//Grundge Couch
	'grundge_couch' : {
		'info': {
			'icon' : 'grungecouch_small.png',
			'title' : 'Grundge Couch',
			'description' : "",
			'height' : '30',
			'stackable' : false,
			'counter' 	: false,
			'seat': true,
		},
		'offsets': {
			'NW': [77, -1, -3, 1, 2],
			'NE': [76, -1, -3, 2, 1],
			'SE': [78, -1, -3, 1, 2],
			'SW': [79, -1, -3, 2, 1]
		}
	},

	//Bubble Gum Machine
	'bubble_gum' : {
		'info': {
			'icon' : 'gumball_small.png',
			'title' : 'Coke Gum Machine',
			'description' : "Secretly coke inside the gumballs.",
			'height' : '60',
			'stackable' : false,
			'counter' 	: false,
		},
		'offsets': {
			'NW': [82, -1, -5, 1, 1],
			'NE': [82, -1, -5, 1, 1],
			'SE': [82, -1, -5, 1, 1],
			'SW': [82, -1, -5, 1, 1]
		}
	},

	//TV
	'tv': {
		'info': {
			'icon' : 'tv_small.png',
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
