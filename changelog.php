<?php

/* static settings */
$plugin = 'Overlay';
$cache_path = $_SERVER['DOCUMENT_ROOT'].'/github_cache/';
$cache_file = $plugin.'-github.txt';
$github_json = get_repo_json($cache_path.$cache_file,$plugin);


//echo get_content_from_github('https://api.github.com/repos/frostover/cokemusic/commits/master');
//echo get_content_from_github('https://api.github.com/repos/frostover/cokemusic/commits?sha=master');


function get_content_from_github($url) {
	$request_headers = array();
	$request_headers[] = 'User-Agent: frostover';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_USERPWD,"frostover:Hurricane1002"); 
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
	$content = curl_exec($ch);
	curl_close($ch);
	return $content;
}

function get_repo_json($file, $plugin) {
	//decisions, decisions
	if(file_exists($file)) {
		//vars
		$current_time = time(); $expire_time = 24 * 60 * 60; $file_time = filemtime($file);
		if(($current_time - $expire_time < $file_time)) {
			//echo 'returning from cached file';
			return file_get_contents($file);
		} else {
			return fetch_github_info($file, $plugin);
		}
	}
	else {
		return fetch_github_info($file, $plugin);
	}
}

function fetch_github_info($file, $plugin) {
	$content = get_content_from_github('https://api.github.com/repos/frostover/cokemusic/commits?sha=master');
	$json = $content;
	file_put_contents($file, $json);
	return $json;
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>CokePhase Changelog</title>

	<style type="text/css">
		body {
			font-size: 16px;
		}

		table td:first-child {
			min-width: 200px;
		}

		table tr:nth-child(even) td {
			background-color: #EDEDED;
		}

		table td {
			vertical-align: top;
			padding: 11px 0;
		}

		table {
			padding: 0;
			margin: 0;
		}
	</style>
</head>
<body>
<h3>Most Recent Updates</h3>
<?php 

if($github_json) {	
	$content = json_decode($github_json);
	// var_dump($content);

	echo '<table cellspacing="0">';
	foreach ($content as $record) {
		// echo '<pre>';
		// var_dump($record);
		// echo '</pre>';

		//Remove any frostover links
		$message = str_replace('frostover', '', $record->commit->message);
		$message = '<td>' . date('F jS Y', strtotime($record->commit->author->date)) . '</td><td>' . $message . '</td>';

		echo '<tr>' . $message . '</tr>';
	}
	echo '</table>';
}
?>
</body>
</html>
