<?php
    require('config.inc.php');
    require('../mysql.inc.php');

    $nameValues = array();
    $nameValues = $_POST;

    // organize values
    foreach($nameValues as $name => $value) {
    
        // validate for empty
        if($value == '') {
            $errorstr = $errorstr . 'missing field,';
        }

        // set the value to variable
        if($name == 'username') {
            $username = $value;
        } else if ($name == 'password') {
            $password = $value;
        }
    }

    $pass_hash = get_hashbrowns($password);

    $stmt = $db->prepare("SELECT * FROM users WHERE username=? AND password=?");
    $stmt->bind_param("ss", $username, $pass_hash);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    if($user['id'] == '') {
        echo('incorrect info, try again');
        header("Refresh: 3; URL=http://localhost/ITS362ProjectRealReal/loginpage.php");
	exit();
    } else { // no errors and login good
        // create session
        $_SESSION['id'] = $user['id'];
        echo("Logic successfully, you will now be redirected to the main page.<br /><h3>Hello ".$username."</h3>");
        header("Refresh: 3; URL=http://localhost/ITS362ProjectRealReal/index.php");
	exit();
        // TODO find where to go
    }
?>
