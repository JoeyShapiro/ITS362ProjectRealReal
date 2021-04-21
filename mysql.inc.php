<?php
    DEFINE('DB_USER', 'its362'); // root for you
    DEFINE('DB_PASS', 'toor'); // dees for you
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_NAME', 'FinalProject'); // project for you

    $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    function get_hashbrowns($password) {
        return hash_hmac('sha256', $password, 'c#haR1891', true);
    }
?>
