var igeClientConfig = {
	include: [
		'./assets/vars.js',

		//Floor, Tiles, Map, etc
		'./gameClasses/Map/FloorTextureMap.js',
		'./gameClasses/Map/GameMap.js',

		//Character movements, clothing, etc
		'./gameClasses/Components/AnimatorComponent.js',
		'./gameClasses/Characters/CharacterHead.js',
		'./gameClasses/Characters/CharacterHair.js',
		'./gameClasses/Characters/CharacterEyes.js',
		'./gameClasses/Characters/CharacterMouth.js',
		'./gameClasses/Characters/CharacterLeftArm.js',
		'./gameClasses/Characters/CharacterRightArm.js',
		'./gameClasses/Characters/CharacterShirt.js',
		'./gameClasses/Characters/Character.js',
		'./gameClasses/Characters/PlayerComponent.js',

		//Furniture
		'./assets/furniture/data.js',
		'./gameClasses/Items/GameItem.js',
		'./gameClasses/Items/GameItemOffsets.js',

		// Chat
		'/gameClasses/Chat/Chat.js',

		/* Standard game scripts */
		'./client.js',
		'./index.js'
	],
	debug: false
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }
