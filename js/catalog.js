var CATALOG_CURRENT_PAGE = 0;

function init_catalog() {
	init_catalog_height();
	init_catalog_icon_load();
	init_catalog_pagination();
	load_catalog_page(3);

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

	}
}

function on_catalog_click() {
	$('#catalog-ui').toggleClass('active');
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
			console.log(error);
		}
	});
}
