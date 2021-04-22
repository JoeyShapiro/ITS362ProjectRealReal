<?php
    require('config.inc.php');
    require('../mysql.inc.php');

    $nameValues = array();
    $nameValues = $_POST;

    // organize values
    foreach($nameValues as $name => $value) {
        // validate for empty
        if($name == 'score') {
            if($value != '0')
                $score = $value;
        }

        $scorem = ceil($score);
    }

    $gid = 1;
    $uid = $_SESSION['id'];

    if($uid == '') {
        echo('incorrect info, try again');
        $location = 'http://' . BASE_URL . 'loginpage.php';
        header("Refresh: 3; URL=$location"); // change in config.inc.php for you
	    exit();
    } else { // no errors and login good
        // create session
        $stmt = $db->prepare("INSERT INTO leaderboard (gid, uid, score) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $gid, $uid, intval($scorem));
        $stmt->execute();
        $result = $stmt->get_result();
        $location = 'http://' . BASE_URL . 'libpage.php';
        header("Refresh: 1; URL=$location"); // change in config.inc.php for you
        exit();
    }
?>