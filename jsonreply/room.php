<?php 
	header('Content-Type: application/json');

	$id = $_POST['id'];
	echo '{';

	switch ($id) {
		case '1':
			?>
			"room_id": "1",
			"room_name": "Studio #1",
			"room_owner": "CokePhase",
			"room_type": "studio_model_b"
			<?php
		break;
		
		case '2':
			?>
			"room_id": "2",
			"room_name": "Studio #2",
			"room_owner": "CokePhase",
			"room_type": "studio_model_c"
			<?php
		break;

		default:
			# code...
			break;
	}

	echo '}';
?>