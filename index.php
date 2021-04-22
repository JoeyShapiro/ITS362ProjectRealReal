<script src="http://code.jquery.com/jquery.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" href="css/styles.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        
<script>
    $(document).ready(function () {
        $("#top").tabs();
    });
</script>

<?php
	date_default_timezone_set('America/Chicago');
	require('includes/config.inc.php');
	require('mysql.inc.php');
	include('html/header.html');

	if(isset($_SESSION['id'])) {
		// get user
		$id = $_SESSION['id'];
		$stmt = $db->prepare("SELECT * FROM users WHERE id=?");
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$result = $stmt->get_result();
		$user = $result->fetch_assoc();
		// do stuff
		echo('<h3>Hello ' . $user['username'] . '</h3>');
	}
?>

<div id="total">
<?php
	$stmt = $db->prepare("SELECT COUNT(*) as total FROM users");
	$stmt->bind_param();
	$stmt->execute();
	$result = $stmt->get_result();
	$row = $result->fetch_assoc();
	echo('<h3>' . $row['total'] . ' Total Users</h3>');
?>
</div>

<div id="motd">
	<h3>Message of the Day:</h3>
	<h4>
<?php
	echo('Today is ' . date('l jS \of F Y h:i:s A') . '.');
?>
	</h4>
	<h4>
<?php
	echo('GLHF');
?>
	</h4>
</div>

<div id="top">
	<ul>
		<li><a href="#top-game1">Hacking Game</a></li>
		<li><a href="#top-game2">Bean Clicker</a></li>
		<li><a href="#top-game3">Game 3</a></li>
	</ul>
	<div id="top-game1">
		<table id="table-game1">
    			<tr><th>User</th><th>Score</th></tr>
<?php
			// get all scores of users from game 1
			$gid = 1;
			$stmt = $db->prepare("SELECT * FROM leaderboard WHERE gid=?");
			$stmt->bind_param("i", $gid);
			$stmt->execute();
			$result = $stmt->get_result();

			while($row = $result->fetch_assoc()) {
				echo('<tr><td>' . $row['uid'] . '</td><td>' . $row['score'] . '</td></tr>');
			}
?>
        	</table>
	</div>

	<div id="top-game2">
		<table id="table-game2" cellspacing="3", cellpadding="3">
            		<tr><th>Rank</th><th>User</th><th>Current Beans</th><th>Total Beans</th><th>Farms</th><th>Plantations</th><th>Upgraded Farms</th><th>Upgraded Plantations</th></tr>
<?php
			// get all scores of users from game 2
			$gid = 2;
			$stmt = $db->prepare("SELECT * FROM beanClicker ORDER BY totalBeans desc");
			$stmt->bind_param("i", $gid);
			$stmt->execute();
			$result = $stmt->get_result();
			$rank = 1;
			while($row = $result->fetch_assoc()) {
				echo('<tr><td>' . $rank . '</td><td>' . $row['username'] . '</td><td>' . $row['currentBeans'] . '</td><td>' . $row['totalBeans'] . '</td><td>' . $row['farms'] . '</td><td>' . $row['plantations'] . '</td><td>' . $row['upgradedFarms'] . '</td><td>' . $row['upgradedPlantations'] . '</td></tr>');
				$rank++;
			}
?>
		</table>
	</div>

	<div id="top-game3">
		<table id="table-game3">
			<tr><th>User</th><th>Score</th></tr>
<?php
			// get all scores of users from game 3
			$gid = 3;
			$stmt = $db->prepare("SELECT * FROM leaderboard WHERE gid=?");
			$stmt->bind_param("i", $gid);
			$stmt->execute();
			$result = $stmt->get_result();

			while($row = $result->fetch_assoc()) {
				echo('<tr><td>' . $row['uid'] . '</td><td>' . $row['score'] . '</td></tr>');
			}
?>
		</table>
	</div>
</div>

<?php
    require('html/footer.html');
?>
