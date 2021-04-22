
<?php
require('/var/www/its362/ITS362ProjectRealReal/mysql.inc.php');
require('/var/www/its362/ITS362ProjectRealReal/includes/config.inc.php');
require('assets/html/header.htm');
if(isset($_SESSION['id'])) {
	$id = $_SESSION['id'];
	
	$stmt = $db->prepare("SELECT * FROM users WHERE id=?");
	$stmt->bind_param("i", $id);
	$stmt->execute();
	$result = $stmt->get_result();
	$user = $result->fetch_assoc();

	$username = $user['username'];

	function insertNew(string $username) {
		try {
		
			$conn = new PDO("mysql:host=localhost;dbname=FinalProject", 'its362', 'toor');
			
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $conn->prepare("INSERT INTO beanClicker (username) VALUES (:username)");
			$stmt->bindParam(':username', $username);
			$stmt->execute();
		}
		catch(PDOException $e) {
		  	echo "Error: " . $e->getMessage();
		}
		$conn = null;
	}


	try {
		$conn = new PDO("mysql:host=localhost;dbname=FinalProject", 'its362', 'toor');
		
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		$stmt = $conn->prepare("SELECT username FROM beanClicker WHERE username=:username");
		$stmt->bindParam(':username', $username);
		$stmt->execute();
		
		$result = $stmt->fetchAll();
		
		foreach($result as $row) {
			$name = $row['username'];
		}
		if($name == '') {
			insertNew($username);
		}
	}
	catch(PDOException $e) {
	  	echo "Error: " . $e->getMessage();
	}
	$conn = null;

	function getBeanObject(string $username){
		try {
			$conn = new PDO("mysql:host=localhost;dbname=FinalProject", 'its362', 'toor');
			
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$stmt = $conn->prepare("SELECT currentBeans, totalBeans, farms, plantations, upgradedFarms, upgradedPlantations, coffeeBeansUsed FROM beanClicker WHERE username=:username");
			$stmt->bindParam(':username', $username);
			$stmt->execute();
			
			$result = $stmt->fetchAll();
			
			foreach($result as $row) {
				$currentBeans = $row['currentBeans'];
				$totalBeans = $row['totalBeans'];
				$farms = $row['farms'];
				$plantations = $row['plantations'];
				$upgradedFarms = $row['upgradedFarms'];
				$upgradedPlantations = $row['upgradedPlantations'];
				$coffeeBeansUsed = $row['coffeeBeansUsed'];
			}
			
			$beanObj->username = $username;
			$beanObj->beanCounter = (int)$currentBeans;
			$beanObj->beansTotal = (int)$totalBeans;
			$beanObj->farms = (int)$farms;
			$beanObj->plantations = (int)$plantations;
			$beanObj->upgradedFarms = (int)$upgradedFarms;
			$beanObj->upgradedPlantations = (int)$upgradedPlantations;
			$beanObj->coffeeBeansUsed = (int)$coffeeBeansUsed;
			
			$beanObj_json = json_encode($beanObj);
			echo("var beanObject = ".$beanObj_json.";");
			echo("var beanMultiplier = 1;");
		}
		catch(PDOException $e) {
		  	echo "Error: " . $e->getMessage();
		}
		$conn = null;
	}
		
	function getBeanAchievements(string $username) {
		try {
			$conn = new PDO("mysql:host=localhost;dbname=FinalProject", 'its362', 'toor');
			
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$stmt = $conn->prepare("SELECT beans100, beans1000, addictionBegins, coffeeDependent, coffeeAddict FROM beanAchievements WHERE username=:username");
			$stmt->bindParam(':username', $username);
			$stmt->execute();
			
			$result = $stmt->fetchAll();
			
			foreach($result as $row) {
				$beans100 = $row['beans100'];
				$beans1000 = $row['beans1000'];
				$addictionBegins = $row['addictionBegins'];
				$coffeeDependent = $row['coffeeDependent'];
				$coffeeAddict = $row['coffeeAddict'];
			}
			$achievements->username = $username;
			$achievements->beans100 = $beans100;
			$achievements->beans1000 = $beans1000;
			$achievements->addictionBegins = $addictionBegins;
			$achievements->coffeeDependent = $coffeeDependent;
			$achievements->coffeeAddict = $coffeeAddict;
			
			$achievements_json = json_encode($achievements);
			echo("var achievementsUnlocked = ".$achievements_json.";");
		}
		catch(PDOException $e) {
		  	echo "Error: " . $e->getMessage();
		}
		$conn = null;
	}

	function insertDB(int $currentBeans, int $totalBeans, int $farms, int $plantations, int $upgradedFarms, int $upgradedPlantations, int $coffeeBeansUsed, $username){
		try {
			$conn = new PDO("mysql:host=localhost;dbname=FinalProject", 'its362', 'toor');
			
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$stmt = $conn->prepare("UPDATE beanClicker SET currentBeans=:currentBeans, totalBeans=:totalBeans, farms=:farms, plantations=:plantations, upgradedFarms=:upgradedFarms, upgradedPlantations=:upgradedPlantations, coffeeBeansUsed=:coffeeBeansUsed WHERE username=:username");
			$stmt->bindParam(':currentBeans', $currentBeans);
			$stmt->bindParam(':totalBeans', $totalBeans);
			$stmt->bindParam(':farms', $farms);
			$stmt->bindParam(':plantations', $plantations);
			$stmt->bindParam(':upgradedFarms', $upgradedFarms);
			$stmt->bindParam(':upgradedPlantations', $upgradedPlantations);
			$stmt->bindParam(':coffeeBeansUsed', $coffeeBeansUsed);
			$stmt->bindParam(':username', $username);
			$stmt->execute();
		}
		catch(PDOException $e) {
	  		echo "Error: " . $e->getMessage();
		}
		$conn = null;
	}
	getBeanObject($username);
	getBeanAchievements($username);
	$items = ("'<input type=\"text\" id=\"beanCountContainer\" name=\"beanCountContainer\" style=\"display: none\"/><input type=\"text\" id=\"beanTotalContainer\" name=\"beanTotalContainer\" style=\"display: none\"/><input type=\"text\" id=\"farmsContainer\" name=\"farmsContainer\" style=\"display: none\"/><input type=\"text\" id=\"plantationsContainer\" name=\"plantationsContainer\" style=\"display: none\"/><input type=\"text\" id=\"upgradedFarmsContainer\" name=\"upgradedFarmsContainer\" style=\"display: none\"/><input type=\"text\" id=\"upgradedPlantationsContainer\" name=\"upgradedPlantationsContainer\" style=\"display: none\"/><input type=\"text\" id=\"coffeeBeansUsedContainer\" name=\"coffeeBeansUsedContainer\" style=\"display: none\"/>'");
				
	echo("function updateDB() {
		j('#inserthere').html(".$items.");
		j('#beanCountContainer').val(beanObject.beanCounter);
		j('#beanTotalContainer').val(beanObject.beansTotal);
		j('#farmsContainer').val(beanObject.farms);
		j('#plantationsContainer').val(beanObject.plantations);
		j('#upgradedFarmsContainer').val(beanObject.upgradedFarms);
		j('#upgradedPlantationsContainer').val(beanObject.upgradedPlantations);
		j('#coffeeBeansUsedContainer').val(beanObject.coffeeBeansUsed);
	};
	");
					
					
	if(isset($_POST['saveBtn']) and $username != null){
		$currentBeans = (int)$_POST['beanCountContainer'];
		$totalBeans = (int)$_POST['beanTotalContainer'];
		$farms = (int)$_POST['farmsContainer'];
		$plantations = (int)$_POST['plantationsContainer'];
		$upFarms = (int)$_POST['upgradedFarmsContainer'];
		$upPlantations = (int)$_POST['upgradedPlantationsContainer'];
		$coffeeUsed = (int)$_POST['coffeeBeansUsedContainer'];
		insertDB($currentBeans, $totalBeans, $farms, $plantations, $upFarms, $upPlantations, $coffeeUsed, $username);
		getBeanObject($username);
	}
require('assets/html/footer.htm');
}
else {
	echo("</script><body><h3>Error: User not found, please log in.</h3></body></html>");
	$location = 'http://' . BASE_URL . 'loginpage.php';
        header("Refresh: 3; URL=$location"); // change in config.inc.php for you
	exit();
}

?>

