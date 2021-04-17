<?php
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
        echo('hello ' . $user['username']);
    }
    require('html/footer.html');
?>