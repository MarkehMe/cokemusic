function init_catalog() {
	init_catalog_height();
	init_catalog_icon_load();

	function init_catalog_height() {
		var catalog = $('catalog-ui-content');
	}

	function init_catalog_icon_load() {
		$('.catalog-item-wrapper img').on('click', function() {
			$('.preview-box-cell img').attr('src', $(this).attr('src'));
			$('.preview-box-cell img').addClass('active');
			$('.preview-box-cell p').removeClass('active');
		});
	}
}
