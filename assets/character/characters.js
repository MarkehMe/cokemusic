var DIRECTIONS = {
	0 : 'NE',
	1 : 'E',
	2 : 'SE',
	3 : 'S',
	4 : 'SW',
	5 : 'W',
	6 : 'NW',
	7 : 'N',
}

var ANIMATIONS = {
	'walk' 	: 'wlk',
	'sit'	: 'sit',
	'stand'	: 'std',
	'dance' : '',
	'drink' : 'drk',
	'carry' : 'crr',
	'speak' : 'spk',
}

var EMOTIONS = {
	'angry' : 'agr',
	'sad' : 'sad',
	'smile' : 'sml',
	'surprise' : 'srp'
}

var ANIMATION_FRAMES = {
	'wlk' : [ 0, 1, 2, 3 ],
	'sit' : [ 0 ],
	'wlk_arm' : [ 1, 3 ],
	'carry' : [ 0 ],
	'drink' : [ 0 ]
}