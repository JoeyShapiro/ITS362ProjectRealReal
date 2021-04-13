<?php
    // insert into DB
    $nameValues = array();
    if(isset($_POST['submit'])) { // when value set
        $nameValues = $_POST;
        foreach($nameValues as $name => $value) {
            echo($name . ": " . $value . "<br />");
        }
        // redirect to login
    } else { // when sent from login page
        echo('
            <form action="register.php" method="POST">
                <input type="text" name="username" placeholder="username"><br/>
                <input type="password" name="password" placeholder="password"><br/>
                <input type="submit" name="submit" value="Login"><br/>
            </form>
        ');
    }
?>