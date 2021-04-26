<?php
    DEFINE('DB_USER', 'seed'); // its362 for you
    DEFINE('DB_PASS', 'dees'); // toor for you
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_NAME', 'project'); // FinalProject for you :P

    $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    function get_hashbrowns($password) {
        return hash_hmac('sha256', $password, 'c#haR1891', true);
    }
?>
