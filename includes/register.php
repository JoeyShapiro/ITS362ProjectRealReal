<h2>Registation</h2>
<?php
    require('config.inc.php');
    require('../mysql.inc.php');
    // insert into DB
    $nameValues = array();
    if(isset($_POST['submit'])) { // when value set
        $nameValues = $_POST;
        // creating values for each element
        foreach($nameValues as $name => $value) {
            echo($name . ": " . $value . "<br />");
            // validate
            // check for empty string
            if($value == '') {
                $errorstr = $errorstr . 'missing field,';
            }

            // set the value to variable
            if($name == 'username') {
                $username = $value;
            } else if ($name == 'password') {
                $password = $value;
            } else if ($name == 'conpass') {
                $conpass = $value;
            } else if ($name == 'email') {
                $email = $value;
            } else if ($name == 'birth') {
                $birth = $value;
            }
        }

        // find smarter way with nots and stuff
        if($errorstr == '') {
            $good = TRUE;
        }

        // insert into database
        // prepare and execute
        //$stmt = $db->prepare("INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)");
        //$stmt->bind_param("sss", $firstname, $lastname, $email);
        //$stmt->execute();

        if($good) {
            echo('<h3>Enjoy The Games</h3>');
            echo('You will now be redirected to login');
            // redirect to login
            header('Location: http://project/loginpage.php');
        } else {
            echo('<h3>uhh ohhs</h3>');
            echo('Something went wrong while registering<br/>');
            echo('Please try again<br/>');
            echo($errorstr);
            echo('
                <form action="register.php" method="GET">
                    <input type="submit" value="Re-Register :(">
                </form>
            ');
        }
    } else { // when sent from login page
        echo('
            <form action="register.php" method="POST">
                <input type="text" name="username" placeholder="username"><br/>
                <input type="password" name="password" placeholder="password"><br/>
                <input type="password" name="conpass" placeholder="confirm password"><br/>
                <input type="text" name="email" placeholder="email"><br/>
                <input type="text" id="date" name="birth" placeholder="birthdate"><br/>
                <input type="submit" name="submit" value="Register"><br/>
            </form>
        ');
    }
?>