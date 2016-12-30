/**
 * When loaded into memory using ige.addGraph('IgeBaseScene') will create
 * the scene "baseScene" and the viewport "vp1" that are used in almost all
 * examples and can be used as the base for your scenegraph as well.
 */
var IgeBaseScene = IgeSceneGraph.extend({
	classId: 'IgeBaseScene',
	
	init: function () {},

	/**
	 * Called when loading the graph data via ige.addGraph().
	 * @param options
	 */
	addGraph: function (options) {
		// Clear existing graph data
		if (ige.$('baseScene')) {
			this.removeGraph();
		}
		
		// Create the scene
		var scene1 = new IgeScene2d()
			.id('scene1')
			.ignoreCamera(true);

		// Create the scene
		var baseScene = new IgeScene2d()
			.id('baseScene');

		// Create the main viewport to look at "baseScene"
		new IgeViewport()
			.id('vp1')
			.autoSize(true)
			.scene(baseScene)
			.drawBounds(false)
			.mount(ige);
	},

	/**
	 * The method called when the graph items are to be removed from the
	 * active graph.
	 */
	removeGraph: function () {
		//console.log(ige.player.player._mouseDownEvent);
		// console.log(ige.input.eventList());
		ige.input.clearEvent('mouseDown');
		ige.input.clearEvent('mouseUp');
		ige.input.clearEvent('keyUp');
		ige.$('tileMap1')._inventoryListener.off();
		
		//ige.input.off('mouseDown', ige.player.player._mouseDownEvent);

		ige.player.removeComponent('player');
		ige.player.removeComponent('animation');
		ige.player.removeComponent('path');

		ige.$('background').destroy();
		ige.$('textureMap').destroy();
		ige.$('tileMap1').destroy();
		ige.$('objectScene').destroy();
		ige.$('gameScene').destroy();

		//Destroy the scene
		ige.$('scene1').destroy();
		
		// Destroy the viewport
		ige.$('vp1').destroy();

		// Destroy the baseScene
		ige.$('baseScene').destroy();
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = IgeBaseScene; }