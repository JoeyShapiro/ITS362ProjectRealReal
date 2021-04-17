<?php
    require('config.inc.php');
    require('../mysql.inc.php');

    $nameValues = array();
    $nameValues = $_POST;

    // organize values
    foreach($nameValues as $name => $value) {
        echo($name . ": " . $value . "<br />");

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
    if($user == '') {
        $errorstr = $errorstr . 'incorrect info,';
    } else { // no errors and login good
        // create session
        $_SESSION['id'] = $user['id'];
        echo($_SESSION['id']);
        header('Location: http://project/index.php');
        // TODO find where to go
    }
?>