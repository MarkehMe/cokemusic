var INVENTORY_OPEN = false;

function init_inventory() {
	var inventory = $('#inventory');
	var inventory_panel = $('#inventory > .i-move');
    var dragging = false;

    $('body').on("mousemove", function(e) {
    	if(dragging == true) {
    		inventory.css('top', (e.pageY - 44));
    		inventory.css('left', (e.pageX - 238));
    	}
    });

    inventory_panel.on("mousedown", function (e) {
    	inventory_panel.css( 'cursor', 'move' );
        dragging = true;
    });

    $('body').on("mouseup", function (e) {
    	inventory_panel.css( 'cursor', 'default' );
        dragging = false;
    });
}

function on_inventory_click() {
	var inventory = $('#inventory');
	var backpack = $('#backpack');
	inventory.css('right', '238px');

	if(INVENTORY_OPEN == false) {
		inventory.animate({
			top: "100px",
		});
		backpack.addClass('active');
		INVENTORY_OPEN = true;
	} else {
		inventory.animate({
			top: "999px",
		});
		backpack.removeClass('active');
		INVENTORY_OPEN = false;
	}
}