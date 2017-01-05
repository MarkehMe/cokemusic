var INVENTORY_OPEN = false;
var CURRENT_INVENTORY_PAGE = 1;

function init_inventory() {
	var inventory = $('#inventory');
	var inventory_panel = $('#inventory > .i-move');
    var dragging = false;

    init_inventory_pages();

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

    //Inventory close
    $('#backpack_close').on("mousedown", function(e) {
    	dragging = false;

		inventory.animate({
			top: "999px",
		});
		$('#backpack').removeClass('active');
		INVENTORY_OPEN = false;
    });
}

function init_inventory_pages() {
	var pageCount = $('#inventory .inventory-data').children('li').length;
	$('.inventory-navigation .i-page-display').html('Page '+CURRENT_INVENTORY_PAGE+' of ' + pageCount);

	//Page back click
	$('.inventory-navigation .i-arrow-left').on("mousedown", function(e) {
		if(CURRENT_INVENTORY_PAGE <= 1) {
			return;
		}
		CURRENT_INVENTORY_PAGE -= 1;

		hide_all_inventory_pages();
		$('.inventory-navigation .i-page-display').html('Page '+CURRENT_INVENTORY_PAGE+' of ' + pageCount);
		show_inventory_page(CURRENT_INVENTORY_PAGE);
    });

    //Page forward click
	$('.inventory-navigation .i-arrow-right').on("mousedown", function(e) {
		if(CURRENT_INVENTORY_PAGE >= pageCount) {
			return;
		}
		CURRENT_INVENTORY_PAGE += 1;

		hide_all_inventory_pages();
		$('.inventory-navigation .i-page-display').html('Page '+CURRENT_INVENTORY_PAGE+' of ' + pageCount);
		show_inventory_page(CURRENT_INVENTORY_PAGE);
    });
}

function hide_all_inventory_pages() {
	$('#inventory .inventory-data > li').each(function() {
		$(this).hide();
	})
}

function show_inventory_page(page) {
	$('#inventory .inventory-data > li:nth-child('+page+')').show();
}

function organize_inventory(page) {
	console.log('organize inventory');

	//Recursive
	if(typeof page !== 'undefined') {
		var page = $(page);

		if(page.children().length >= INVENTORY_ITEMS_PER_PAGE) {
			return;
		}

		//Get the next page to take items from
		var nextPage = page.next().children('ul');
		if(typeof nextPage === 'undefined') {
			return;
		}

		nextPage = $(nextPage[0]);

		//Make sure the item has data
		if(nextPage.children().length <= 0) {
			nextPage.remove();
			return;
		}

		var itemToMove = nextPage.children('ul li:first');
		$(page.children('ul')[0]).append(itemToMove);
		//console.log(itemToMove);
		return;
	}

	//Check and make sure all the pages are full
	$('#inventory .inventory-data').children('li').each(function() {
		organize_inventory(this);
	});

	var pageCount = $('#inventory .inventory-data').children('li').length;
	$('.inventory-navigation .i-page-display').html('Page '+CURRENT_INVENTORY_PAGE+' of ' + pageCount);
}

function inventory_pickup(item_id, item_icon, first) {
	var pageCount = $('#inventory .inventory-data').children('li').length;

	var lastPage = $('#inventory .inventory-data > li').last();
	if( $(lastPage.children('ul')[0]).length >= INVENTORY_ITEMS_PER_PAGE ) {
		//Create new page
		pageCount += 1;
		$('<li data-page="'+pageCount+'"><ul class="items clearfix"></ul></li>').appendTo('#inventory .inventory-data');
		lastPage = $('#inventory .inventory-data li').last();
	}

	lastPage = $(lastPage.children('ul')[0]);

	if(typeof first === 'undefined' || first == false) {	
		$('<li><a data-item="'+item_id+'"><img src="'+item_icon+'"></a></li>').appendTo(lastPage);
		console.log('here');
	} else {
		//TODO: add item to the first page
	}

	$('.inventory-navigation .i-page-display').html('Page '+CURRENT_INVENTORY_PAGE+' of ' + pageCount);
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

function on_inventory_close_click() {

}