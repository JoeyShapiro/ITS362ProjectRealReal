<?php
    $nameValues = array();
    $nameValues = $_POST;

    foreach($nameValues as $name => $value) {
        echo($name . ": " . $value . "<br />");
    }
?>