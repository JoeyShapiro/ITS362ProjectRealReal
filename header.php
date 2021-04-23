<html>
    <head>
        <link rel="stylesheet" href="css/styles.css">
        <title>Game Project Site Thing</title>
    </head>

    <header id="headerHeader">
        <h1>Flash Game Project Site</h1>
        <h3>For when playing flash games is PART of class</h3>
    </header>

    <nav id="headerNav">
<?php
require('includes/config.inc.php');
	echo('
	<a href="http://'.BASE_URL.'index.php">Home</a>
        <a href="http://'.BASE_URL.'libpage.php">Games</a>
        <a href="http://'.BASE_URL.'leaders.php">Leaderboards</a>
	');
        if(isset($_SESSION['id'])){
        	echo('
		<a href="http://'.BASE_URL.'logout.php">Log Out</a>
		</nav><br />
		<body>
        	');
        }
        else {
        	echo('
        	<a href="http://'.BASE_URL.'loginpage.php">Login</a>
   		 </nav><br />
   		 <body>
   		 ');
	 }
?>
