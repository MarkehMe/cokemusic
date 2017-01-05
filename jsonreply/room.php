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

		case '3':
			?>
			"room_id": "3",
			"room_name": "Studio #3",
			"room_owner": "CokePhase",
			"room_type": "studio_model_a"
			<?php
		break;

		case '4':
			?>
			"room_id": "4",
			"room_name": "Studio #4",
			"room_owner": "CokePhase",
			"room_type": "studio_model_d"
			<?php
		break;

		case '5':
			?>
			"room_id": "5",
			"room_name": "Rooftop Studio",
			"room_owner": "CokePhase",
			"room_type": "studio_model_rooftop"
			<?php
		break;

		case '6':
			?>
			"room_id": "6",
			"room_name": "Studio Wayne",
			"room_owner": "CokePhase",
			"room_type": "studio_wayne"
			<?php
		break;

		case '7':
			?>
			"room_id": "7",
			"room_name": "Pokemon",
			"room_owner": "CokePhase",
			"room_type": "pokemon"
			<?php
		break;

		default:
			# code...
			break;
	}

	echo '}';
?>