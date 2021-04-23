<?php
require('includes/config.inc.php');
session_destroy();
echo("Logout successful. You will now be redirected to the main page");
$location = 'http://'.BASE_URL.'/index.php';
header("Refresh: 3; URL=$location"); // change in config.inc.php for you
exit();
?>
