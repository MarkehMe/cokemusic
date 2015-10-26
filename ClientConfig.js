var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		//'./gameClasses/MyCustomClassFile.js',
		'./gameClasses/Components/AnimatorComponent.js',
		'./gameClasses/Map/FloorTextureMap.js',
		'./gameClasses/Characters/CharacterHead.js',
		'./gameClasses/Characters/CharacterHair.js',
		'./gameClasses/Characters/CharacterEyes.js',
		'./gameClasses/Characters/CharacterMouth.js',
		'./gameClasses/Characters/CharacterLeftArm.js',
		'./gameClasses/Characters/CharacterRightArm.js',
		'./gameClasses/Characters/CharacterShirt.js',
		'./gameClasses/Characters/Character.js',
		'./gameClasses/Characters/PlayerComponent.js',

		
		/* Standard game scripts */
		'./client.js',
		'./index.js'
	], 
	debug: false
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }