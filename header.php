<html>
    <head>
        <link rel="stylesheet" href="css/styles.css">
        <title>Game Project Site Thing</title>
    </head>

    <header>
        <h1>Flash Game Project Site</h1>
        <h3>For when playing flash games is PART of class</h3>
    </header>

    <nav>
        <a href="index.php">Home</a> |
        <a href="libpage.php">Games</a> |
        <a href="leaders.php">Leaderboards</a> |
<?php
require('includes/config.inc.php');
        if(isset($_SESSION['id'])){
        	echo('
		<a href="http://'.BASE_URL.'logout.php">Logout</a>
		</nav>
		<body>
        	');
        }
        else {
        	echo('
        	<a href="http://'.BASE_URL.'loginpage.php">Login</a>
   		 </nav>
   		 <body>
   		 ');
	 }
?>
