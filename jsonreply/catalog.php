<?php 
	header('Content-Type: application/json');

	$page = '0';
	if(isset($_POST['page'])) {
		$page = $_POST['page'];
	} elseif(isset($_GET['page'])) {
		$page = $_GET['page'];
	} elseif(isset($_POST['page-number'])) {
		$data['pages'] = 15;
		echo json_encode($data);
		return;
	}

	switch ($page) {
		case '0':
			$jsonString = file_get_contents("catalog/page-0.json");
			echo $jsonString;
			break;

		case '1':
			$jsonString = file_get_contents("catalog/page-1.json");
			echo $jsonString;
			break;
			
		case '2':
			$jsonString = file_get_contents("catalog/page-2.json");
			echo $jsonString;
			break;
			
		case '3':
			$jsonString = file_get_contents("catalog/page-3.json");
			echo $jsonString;
			break;
			
		case '4':
			$jsonString = file_get_contents("catalog/page-4.json");
			echo $jsonString;
			break;
				
		case '5':
			$jsonString = file_get_contents("catalog/page-5.json");
			echo $jsonString;
			break;
				
		case '6':
			$jsonString = file_get_contents("catalog/page-6.json");
			echo $jsonString;
			break;
				
		case '7':
			$jsonString = file_get_contents("catalog/page-7.json");
			echo $jsonString;
			break;
				
		case '8':
			$jsonString = file_get_contents("catalog/page-8.json");
			echo $jsonString;
			break;
				
		case '9':
			$jsonString = file_get_contents("catalog/page-9.json");
			echo $jsonString;
			break;
			
			
		case '10':
			$jsonString = file_get_contents("catalog/page-10.json");
			echo $jsonString;
			break;
		
		case '11':
			$jsonString = file_get_contents("catalog/page-11.json");
			echo $jsonString;
			break;
			
		case '12':
			// TODO: JSON FIle is too large. Need to separate into multiple
			// Need to find images for this data as well
			//$jsonString = file_get_contents("catalog/page-12.json");
			//echo $jsonString;
			break;
			
		case '13':
			// TODO: JSON FIle is too large. Need to separate into multiple
			// Need to find images for this data as well
			//$jsonString = file_get_contents("catalog/page-13.json");
			//echo $jsonString;
			break;
			
		case '14':
			$jsonString = file_get_contents("catalog/page-14.json");
			echo $jsonString;
			break;
			
		case '15':
			$jsonString = file_get_contents("catalog/page-15.json");
			echo $jsonString;
			break;
			
		default:
			console.log("catalog.php: default case line 69");
			break;
	}
?>