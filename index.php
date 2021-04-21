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
?>

<div id="total">
<?php
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM users");
    $stmt->bind_param();
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    echo('<h3>' . $row['total'] . ' Total Users</h3>');
?>
</div>

<div id="motd">
    <h3>Message of the Day:</h3>
    <h4>
<?php
    echo('Today is ' . date('l jS \of F Y h:i:s A') . '.');
?>
    </h4>
    <h4>
<?php
    echo('GLHF');
?>
    </h4>
</div>

<?php
    require('html/footer.html');
?>