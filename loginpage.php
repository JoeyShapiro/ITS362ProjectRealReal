<?php
	session_start();
	require('includes/config.inc.php');
	include('html/header.html');
	require('mysql.inc.php');
	if(isset($_POST['loginsubmit'])){
		$username = $_POST['username'];
		$password = $_POST['password'];
		$pass_hash = get_hashbrowns($password);
		$stmt = $db->prepare("SELECT * FROM users WHERE username=? OR email=? AND password=?");
		$stmt->bind_param("sss", $username, $username, $pass_hash);
		$stmt->execute();
		$result = $stmt->get_result();
		$user = $result->fetch_assoc();
		// do stuff
		$_SESSION['id'] = $user['id'];
		echo("<br /><br /><h3>Logic successful, redirecting to the main page.</h3>");
		header("Refresh: 3; URL=http://localhost/ITS362ProjectRealReal/index.php");
		exit();
	}
	else{
		echo('
			<form action="loginpage.php" method="POST">
				<input type="text" name="username" placeholder="username"><br/>
				<input type="password" name="password" placeholder="password"><br/>
				<input type="submit" name="loginsubmit" value="Login"><br/>
			</form>
			<form action="includes/register.php" method="GET">
				<input type="submit" value="Or Register">
			</form>
		');
	
	}
	require('html/footer.html');
?>
