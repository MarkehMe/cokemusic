/**
 * Adds mouse control to the entity this component is added to.
 * @type {IgeClass}
 */
var PlayerComponent = IgeClass.extend({
	classId: 'PlayerComponent',
	componentId: 'player',
	targetPos: { x: null, y: null },
	init: function (entity, options) {
		var self = this;

		// Store the entity that this component has been added to
		this._entity = entity;

		// Store any options that were passed to us
		this._options = options;

		// Listen for the mouse up event
		ige.input.on('mouseUp', function () { self._mouseUp(); });

		//Listen for key event
		ige.input.on('keyUp', function (event, keyCode) { self._keyUp(event, keyCode); });

		// Listen for point reach input
		entity.path.on('pointComplete', function () { self._pointReached(); });
		entity.path.on('pathComplete', function () { self._pathComplete(); });
		entity.path.on('started', function () { self._pathStarted(); });
	},

	/**
	 * Handles what we do when a mouseUp event is fired from the engine.
	 * @param event
	 * @private
	 */
	_mouseUp: function () {
		if(ige.movingItem == true)
			return false;

		// Get the tile co-ordinates that the mouse is currently over
		var endTile = ige.$('tileMap1').mouseToTile(),
			overTiles;

		// Check the bounds
		//TODO: this needs to be alot more complex
		 if(endTile.x < 0 || endTile.x >= 11 || endTile.y < 0 || endTile.y >= 11)
		 	return;

		overTiles = this._entity.overTiles()[0];

		// If we're already headed here we don't want to try again
		if (this.targetPos.x == endTile.x && this.targetPos.y == endTile.y) return;

		this.targetPos.x = endTile.x;
		this.targetPos.y = endTile.y;

		// Tell the entity to start navigating along the new path
		//TODO: need to add the speed to some sort of global var JS
		this._entity.path
			.set(overTiles.x, overTiles.y, 0, endTile.x, endTile.y, 0)
			.speed(1.75)
			.start();
	},

	_keyUp: function (event, keyCode) {
		if (keyCode === ige.input.key.space) {
			// Change the character
			this._entity._characterType++;

			if (this._entity._characterType > 7) {
				this._entity._characterType = 0;
			}

			this._entity.setType(this._entity._characterType);

			//If the character is currently moving update the direction.
			if(this._entity.path._active == true)
				this._entity.changeDirection(this._entity.path.getDirection());
		}
	},

	_pointReached: function() {
		var direction = this._entity.path.getDirection();
		if(direction != '')
			this._entity.changeDirection(direction);
	},

	_pathComplete: function() {
		this._entity.animation.stop();

		this._entity.rest();
	},

	_pathStarted: function() {
		var direction = this._entity.path.getDirection();
		if(direction != '') {
			this._entity.changeDirection(direction);

			// If we didn't just click an item, we hide the infostand
			if ( ! ige.overItem) $('#infostand').hide();
		}
	},
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = PlayerComponent; }
