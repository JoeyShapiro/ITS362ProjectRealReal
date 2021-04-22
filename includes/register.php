<?php
// TODO fix this the nav acts funny in here
//include('../html/header.html');
?>
<h2>Registation</h2>
<?php
	require('config.inc.php');
	require('../mysql.inc.php');
	// insert into DB
	$nameValues = array();
	if(isset($_POST['regsubmit'])) { // when value set
        	$nameValues = $_POST;
		// creating values for each element
		foreach($nameValues as $name => $value) {
			if($name != 'regsubmit'){
				//echo($name . ": " . $value . "<br />");
		   		// validate
			    	// check for empty string
			    	if($value == '') {
					$errorstr = $errorstr . $name . ' missing field,';
			    	}

			    	// set the value to variable
			    	switch($name){
			    		case 'username':
			    			$username = $value;
			    			break;
		    			case 'password':
		    				$password = $value;
		    				break;
	    				case 'conpass':
	    					$conpass = $value;
	    					break;
					case 'email':
						$email = $value;
						break;
					case 'birth':
						$birth = $value;
						break;
					default:
						break;
			    	}
	   		}
        	}
		// check confirm password is correct
		if($password != $conpass) {
			$errorstr = $errorstr . ' mismatch password,';
		}
		
		$stmt = $db->prepare("SELECT * FROM users WHERE username=? OR email=?");
		$stmt->bind_param("ss", $username, $email);
		$stmt->execute();
		$result = $stmt->get_result();
		$user = $result->fetch_assoc();
		if($user != '') {
			$errorstr = $errorstr . ' user with name or email,';
		}
		
		// hash password
		$pass_hash = get_hashbrowns($password);

		// find smarter way with nots and stuff
		if($errorstr == '') {
			$good = TRUE;
			$stmt = $db->prepare("INSERT INTO users (username, password, email, birth) VALUES (?, ?, ?, ?)");
			$stmt->bind_param("ssss", $username, $pass_hash, $email, $birth); // doubl check
			$stmt->execute();
		}

		if($good) {
			//get the id of the user that we just inserted
			$stmt = $db->prepare("SELECT * FROM users WHERE username=? OR email=?");
			$stmt->bind_param("ss", $username, $email);
			$stmt->execute();
			$result = $stmt->get_result();
			$user = $result->fetch_assoc();
			
			$_SESSION['id'] = $user['id'];
			
			echo('<h3>Enjoy The Games</h3>');
			echo('You will now be redirected to login');
			// redirect to login
			$location = 'http://' . BASE_URL . 'index.php';
			header("Refresh: 3; URL=$location"); // localhost/ITS362ProjectRealReal for you
			exit();
			
		} else {
	    		echo('<h3>uhh ohhs</h3>');
		    	echo('Something went wrong while registering<br/>');
		    	echo('Please try again<br/>');
		    	echo($errorstr);
		    	echo('
				<form action="register.php" method="GET">
			    	<input type="submit" value="Re-Register :(">
				</form>
		    	');
		}
	} else { // when sent from login page
        	echo('
		    	<form action="register.php" method="POST">
		        	<input type="text" name="username" placeholder="username" /><br/>
		        	<input type="password" name="password" placeholder="password" /><br/>
		        	<input type="password" name="conpass" placeholder="confirm password" /><br/>
		        	<input type="text" name="email" placeholder="email" /><br/>
		        	<input type="text" id="date" name="birth" placeholder="birthdate" /><br/>
		        	<input type="submit" id="regsubmit" name="regsubmit" value="Register" /><br/>
		    	</form>
        	');
    	}
?>
<?php
//include('../html/footer.html');
?>
