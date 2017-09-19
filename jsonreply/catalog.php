<?php 
	header('Content-Type: application/json');

	$page = '0';
	if(isset($_POST['page'])) {
		$page = $_POST['page'];
	} elseif(isset($_GET['page'])) {
		$page = $_GET['page'];
	}

	switch ($page) {
		case '0':
			# code...
			break;

		case '1':
			# code...
			break;

		case '3':
			$jsonString = file_get_contents("catalog/page-3.json");
			echo $jsonString;
			break;
		
		default:
			# code...
			break;
	}
?>