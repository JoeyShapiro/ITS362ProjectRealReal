<?php
	session_start();
	require('includes/config.inc.php');
	require('mysql.inc.php');
	include('html/header.html');
	if(isset($_SESSION['userID'])) {
		// do stuff
		echo("<br /><h3>Hello ". $_SESSION['userID']."</h3>");
	}
	require('html/footer.html');
?>
