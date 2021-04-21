<?php
    DEFINE('DB_USER', 'its362');
    DEFINE('DB_PASS', 'toor');
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_NAME', 'FinalProject');

    $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    function get_hashbrowns($password) {
        return hash_hmac('sha256', $password, 'c#haR1891', true);
    }
?>
