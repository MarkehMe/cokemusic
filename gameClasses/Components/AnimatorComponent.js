/**
 * The animation component class. Handles defining and controlling
 * frame-based animations based on cells from a texture.
 * @event started - The animation starts.
 * @event stopped - The animation ends or is stopped.
 * @event loopComplete - The animation has completed a full cycle (shown all frames).
 * @event complete - The animation has completed all assigned loop cycles.
 */
var AnimatorComponent = IgeAnimationComponent.extend({
	classId: 'AnimatorComponent',
	componentId: 'animation',

	init: function (entity, options) {
		this._entity = entity;
		this._anims = {};

		// Add the animation behaviour to the entity
		entity.addBehaviour('tween', this._update);
	},

	/**
	 * Sets the flipped texture.
	 * @returns {*}
	 */
	textureFlipped: function(flip) {
		if(!flip)
			return; 

		//this._textureFlipped;
		console.log(this._entity._texture);

	},

});