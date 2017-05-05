<?php 
	header('Content-Type: application/json');

	$page = '0';
	if(isset($_POST['page'])) {
		$page = $_POST['page'];
	}

	switch ($page) {
		case '0':
			# code...
			break;

		case '1':
			# code...
			break;
		
		default:
			# code...
			break;
	}
?>