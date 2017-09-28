 var CATALOG_CURRENT_PAGE = 1;
var CATALOG_TOTAL_PAGES = 0;

function init_catalog() {
	init_catalog_height();
	init_catalog_icon_load();
	init_catalog_pagination();
	//load_catalog_page(CATALOG_CURRENT_PAGE);

	function init_catalog_height() {
		var catalog = $('catalog-ui-content');
	}

	function init_catalog_icon_load() {
		
		$(document).on('mousedown', '.catalog-img-wrapper img', function(){
			$('.catalog-data li[data-page="'+$(this).data('page')+'"] .preview-box-cell img').attr('src', $(this).attr('src'));
			$('.catalog-data li[data-page="'+$(this).data('page')+'"] .preview-box-cell img').addClass('active');
			$('.catalog-data li[data-page="'+$(this).data('page')+'"] .preview-box-cell p').removeClass('active');
		});
	}

	function init_catalog_pagination() {
		// Grab the total number of pages by querying server
		$.ajax({
			url: CATALOG_JSON_URL,
			method: "POST",
			dataType: "json",
			data: { "page-number": true },
			success: function(data) {		
			console.log(data.pages)	;
				CATALOG_TOTAL_PAGES = data.pages;
				
				// LOAD All the Catalog Data to the webpage here.
				// Assumes all data is stored in /jsonreply/catalog/
				// Assumes index.html and catalog.php is in sync with # of files.
				for(var i = 0; i <= CATALOG_TOTAL_PAGES; i++) {		
					load_catalog_page(i);
				}
				
				// Default the Pages Text
				$('.catalog-pagination .pages-text').html('<span>Page: '+CATALOG_CURRENT_PAGE+'/'+CATALOG_TOTAL_PAGES+'</span>');
			},
			error: function(error) {
				console.log('init_catalog_pagination: ' + error);
			}
			
		});
	}
	
	$('.next-btn').click(function(){
		on_catalog_next_button_click();
	});
	
	$('.prev-btn').click(function(){
		on_catalog_previous_button_click();
	});
	
}

function on_catalog_click() {
	toggle_popup($('#catalog-ui'));
}

function load_catalog_page(pageNum) {
	$.ajax({
		url: CATALOG_JSON_URL,
		method: "POST",
		dataType: "json",
		data: { "page": pageNum },
		success: function(data) {
			var page = $('.catalog-data li[data-page="'+pageNum+'"]');
			var header = page.find('.catalog-page-header');
			var description = page.find('.text-and-preview > p');
			var items = page.find('.items');

			header.html(data.title);
			description.html(data.description);

			for (var i = data.items.length - 1; i >= 0; i--) {
				$('<li class="clearfix"><div class="catalog-item-wrapper"><div class="catalog-img-wrapper"><img src="./assets/furniture/icons/'+data.items[i].image+'" data-page="'+pageNum+'"/></div><a class="catalog-item-info" href="javascript:;"><span>'+data.items[i].name+'</span><span>'+data.items[i].price+' dB</span></a><a class="btn catalog-item-buy" href="javascript:;">Buy</a></div></li>').appendTo(items);
			}
		},
		error: function(error) {
			
		}
	});
}

function on_catalog_next_button_click() {
	
	// CATALOG_CURRENT_PAGE is 1 based json files are 0 based.
	var current_page = CATALOG_CURRENT_PAGE - 1;
	var previous_page = current_page;
	
	if( CATALOG_CURRENT_PAGE  < CATALOG_TOTAL_PAGES ){
		CATALOG_CURRENT_PAGE = CATALOG_CURRENT_PAGE + 1;
		current_page = CATALOG_CURRENT_PAGE - 1;
	
	
		//load_catalog_page(CATALOG_CURRENT_PAGE);
	
		$('.catalog-data li[data-page="' + previous_page + '"]').removeClass('active');
		$('.catalog-data li[data-page="' + current_page + '"]').addClass('active');
		$('.catalog-pagination .pages-text').html('<span>Page: '+ CATALOG_CURRENT_PAGE +'/'+CATALOG_TOTAL_PAGES+'</span>');
	}
}

function on_catalog_previous_button_click() {
	
	// CATALOG_CURRENT_PAGE is 1 based json files are 0 based.
	var current_page = CATALOG_CURRENT_PAGE - 1;
	var previous_page = CATALOG_CURRENT_PAGE - 1;
	
	if( CATALOG_CURRENT_PAGE > 1 ) {
		CATALOG_CURRENT_PAGE = CATALOG_CURRENT_PAGE - 1;
		current_page = CATALOG_CURRENT_PAGE - 1;
	
		//load_catalog_page(CATALOG_CURRENT_PAGE);
	
		$('.catalog-data li[data-page="' + previous_page + '"]').removeClass('active');
		$('.catalog-data li[data-page="' + current_page + '"]').addClass('active');
		$('.catalog-pagination .pages-text').html('<span>Page: '+ CATALOG_CURRENT_PAGE +'/'+CATALOG_TOTAL_PAGES+'</span>');
	}
}
	