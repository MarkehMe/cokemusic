var igeClientConfig = {
	include: [
		'./assets/vars.js',
		'./gameClasses/Class.js',
		'./gameClasses/TexturePackerAtlas.js',
		'./gameClasses/Components/AnimatorComponent.js',

		//Floor, Tiles, Map, etc
		'./gameClasses/Map/FloorTextureMap.js',
		'./gameClasses/Map/GameMap.js',
		'./gameClasses/Map/GameWallMatrix.js',
		'./gameClasses/Map/GameWall.js',

		//Character movements, clothing, etc
		'./assets/character/characters.js',
		'./assets/character/data.js',
		'./gameClasses/Characters/CharacterPart.js',
		'./gameClasses/Characters/CharacterBody.js',
		'./gameClasses/Characters/CharacterHead.js',
		'./gameClasses/Characters/CharacterHair.js',
		'./gameClasses/Characters/CharacterEyes.js',
		'./gameClasses/Characters/CharacterMouth.js',
		'./gameClasses/Characters/CharacterLeftArm.js',
		'./gameClasses/Characters/CharacterRightArm.js',
		'./gameClasses/Characters/CharacterShirt.js',
		'./gameClasses/Characters/CharacterLeftSleve.js',
		'./gameClasses/Characters/CharacterRightSleve.js',
		'./gameClasses/Characters/CharacterPants.js',
		'./gameClasses/Characters/CharacterShoes.js',
		'./gameClasses/Characters/CharacterCarry.js',
		'./gameClasses/Characters/Character.js',
		'./gameClasses/Characters/PlayerComponent.js',

		//Furniture
		'./assets/furniture/data.js',
		'./gameClasses/Items/GameItem.js',
		'./gameClasses/Items/GameItemOffsets.js',

		//Rooms
		'./assets/rooms/rooms.js',
		'./gameClasses/Room/Room.js',
		'./gameClasses/Room/PlayerStudio.js',

		// Chat
		'/gameClasses/Chat/Chat.js',

		/* Standard game scripts */
		'./client.js',
		'./index.js'
	],
	debug: true
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }
