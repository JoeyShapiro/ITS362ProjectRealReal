<?php
    DEFINE('DB_USER', 'root');
    DEFINE('DB_PASS', 'dees');
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_NAME', 'project');

    $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
?>