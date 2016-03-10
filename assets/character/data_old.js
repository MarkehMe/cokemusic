// /*
// 	[character] - male, female, etc
// 		* init - the initial event and direction ['standing', 'SE']
// 		[object] - head, torso, shirt, etc
// 			[secondary style] - 001, 002
// 				[event] - standing, sitting, etc
// 					[frames] - array of directions NW, NE, S, etc
// 						* speed - animation fps (default 1)
// 						* flip  - should this frame cause the character to flip horizontally (default false)
// 						* depth - sorting of this frame ontop of other elements (default false)
// 						* hidden- should this frame cause the object to be hidden (default false)
// 						* anchor- image offsets [x,y] that will change the position of the cell (default [0,0])
// 						* cell  - the name of the cell to target as defined in people.js:filename
// 				[nested object] - mouth, eyes, etc
// */

/*

[object] 
	[style]
		[action]
			[direction]
				[direction-animation]

*/

var PEOPLE_DATA	= {
	//Head
	'hd' : {
		'001' : {
			'std' : {
				'NE' : {
					'0' : [ [0,0] ]
				},

				'S' : {
					'0' : [ [0, -42] ]
				},

				'E' : {
					'0' : [ [-1, -42] ]
				},
				'W' : {
					'0' : [ [-1, -42] ]
				},
			},

			'spk' : {

			},
		},
	},
}

// var CHARACTER = {
// 	'male_01' : {
// 		'default' : ['standing', 'SE'],

// 		'head' : {
// 			'001' : {
// 				'standing' : {
// 					'frames': {
// 						'NW' : [
// 							{
// 								'speed' : 1,
// 								'flip'	: true,
// 								'depth' : 1,
// 								'hidden': false,
// 								'anchor': [0, 0],
// 								'cell' 	: 'h_std_bd_001_0_0.png.png'
// 							}
// 						],
// 						'NE' : [
// 							{
// 								'anchor': [0, 0],
// 								'cell' 	: 'h_std_bd_001_0_0.png.png'
// 							}
// 						],
// 						'W' : [
// 							{
// 								'flip'	: true,
// 								'anchor': [0, 0],
// 								'cell' 	: 'h_std_bd_001_1_0.png.png'
// 							}
// 						],
// 						'SW' : [
// 							{
// 								'flip'	: true,
// 								'anchor': [0, 0],
// 								'cell' 	: 'h_std_bd_001_2_0.png.png'
// 							}
// 						],
// 						'SE' : [
// 							{
// 								'anchor': [0, 0],
// 								'cell' 	: 'h_std_bd_001_2_0.png.png'
// 							}
// 						],
// 						'E' : [
// 							{
// 								'anchor': [0, 0],
// 								'cell' 	: 'h_std_bd_001_1_0.png.png'
// 							}
// 						],
// 						'N' : [
// 							{
// 								'anchor': [0, 0],
// 								'cell' 	: 'h_std_bd_001_7_0.png.png'
// 							}
// 						],
// 						'S' : [
// 							{
// 								'anchor': [0, 0],
// 								'cell' 	: 'h_std_bd_001_3_0.png.png'
// 							}
// 						],
// 					},
// 				},

// 				'eyes' : {

// 				},

// 				'hair' : {

// 				},

// 				'mouth' : {

// 				},
// 			},

// 		},

// 		'torso' : {

// 		},

// 		'arms' : {

// 		},

// 		'shirt' : {

// 		},

// 		'sleeve' : {

// 		},

// 		'pants' : {

// 		},

// 		'hat' : {

// 		},
// 	}
// }