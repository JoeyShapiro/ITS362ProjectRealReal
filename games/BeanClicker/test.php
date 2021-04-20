<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title> Bean Clicker </title>
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="./assets/scripts/before.js"></script>
		<script type="text/javascript">
			<?php
				$userID = 'ryan';
			
				function getBeanObject($userID){
					try {
						$conn = new PDO("mysql:host=localhost;dbname=FinalProject", 'its362', 'toor');
						
						$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
						
						$stmt = $conn->prepare("SELECT currentBeans, totalBeans, beansPerSecond, farms, plantations, upgradedFarms, upgradedPlantations, coffeeBeansUsed FROM beanClicker WHERE userID=:userID");
						$stmt->bindParam(':userID', $userID);
						$stmt->execute();
						
						$result = $stmt->fetchAll();
						
						foreach($result as $row) {
							$currentBeans = $row['currentBeans'];
							$totalBeans = $row['totalBeans'];
							$beansPerSecond = $row['beansPerSecond'];
							$farms = $row['farms'];
							$plantations = $row['plantations'];
							$upgradedFarms = $row['upgradedFarms'];
							$upgradedPlantations = $row['upgradedPlantations'];
							$coffeeBeansUsed = $row['coffeeBeansUsed'];
						}
						
						$stmt = $conn->prepare("SELECT beans100, beans1000, addictionBegins, coffeeDependent, coffeeAddict FROM beanAchievements WHERE userID=:userID");
						$stmt->bindParam(':userID', $userID);
						$stmt->execute();
						
						$result = $stmt->fetchAll();
						
						foreach($result as $row) {
							$beans100 = $row['beans100'];
							$beans1000 = $row['beans1000'];
							$addictionBegins = $row['addictionBegins'];
							$coffeeDependent = $row['coffeeDependent'];
							$coffeeAddict = $row['coffeeAddict'];
						}
						
						$beanObj->userID = $userID;
						$beanObj->beanCounter = (int)$currentBeans;
						$beanObj->beansTotal = (int)$totalBeans;
						$beanObj->beansPerSecond = (float)$beansPerSecond;
						$beanObj->farms = (int)$farms;
						$beanObj->plantations = (int)$plantations;
						$beanObj->upgradedFarms = (int)$upgradedFarms;
						$beanObj->upgradedPlantations = (int)$upgradedPlantations;
						$beanObj->coffeeBeansUsed = (int)$coffeeBeansUsed;
						
						$beanObj_json = json_encode($beanObj);
						
						$achievements->userID = $userID;
						$achievements->beans100 = $beans100;
						$achievements->beans1000 = $beans1000;
						$achievements->addictionBegins = $addictionBegins;
						$achievements->coffeeDependent = $coffeeDependent;
						$achievements->coffeeAddict = $coffeeAddict;
						
						$achievements_json = json_encode($achievements);

						echo("var beanObject = ".$beanObj_json.";
						");
						echo("var beanMultiplier = 1;
						");
						echo("var achievementsUnlocked = ".$achievements_json.";
						");
					} 
					catch(PDOException $e) {
					  	echo "Error: " . $e->getMessage();
					}
					$conn = null;
				}
				
				function insertDB(int $currentBeans, int $totalBeans, int $beansPerSecond, int $farms, int $plantations, int $upgradedFarms, int $upgradedPlantations, int $coffeeBeansUsed, $userID){
					try {
						$conn = new PDO("mysql:host=localhost;dbname=FinalProject", 'its362', 'toor');
						
						$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
						
						$stmt = $conn->prepare("UPDATE beanClicker SET currentBeans=:currentBeans, totalBeans=:totalBeans, beansPerSecond=:beansPerSecond, farms=:farms, plantations=:plantations, upgradedFarms=:upgradedFarms, upgradedPlantations=:upgradedPlantations, coffeeBeansUsed=:coffeeBeansUsed WHERE userID=:userID");
						$stmt->bindParam(':currentBeans', $currentBeans);
						$stmt->bindParam(':totalBeans', $totalBeans);
						$stmt->bindParam(':beansPerSecond', $beansPerSecond);
						$stmt->bindParam(':farms', $farms);
						$stmt->bindParam(':plantations', $plantations);
						$stmt->bindParam(':upgradedFarms', $upgradedFarms);
						$stmt->bindParam(':upgradedPlantations', $upgradedPlantations);
						$stmt->bindParam(':coffeeBeansUsed', $coffeeBeansUsed);
						$stmt->bindParam(':userID', $userID);
						//echo("alert('".$userID."');");
						$stmt->execute();
					}
					catch(PDOException $e) {
				  		echo "Error: " . $e->getMessage();
					}
					$conn = null;
				}
				
				getBeanObject($userID);
				
				echo("function updateDB() {
					j('#beanCountContainer').val(beanObject.beanCounter);
					j('#beanTotalContainer').val(beanObject.beansTotal);
					j('#beansPerSecondContainer').val(beanObject.beansPerSecond);
					j('#farmsContainer').val(beanObject.farms);
					j('#plantationsContainer').val(beanObject.plantations);
					j('#upgradedFarmsContainer').val(beanObject.upgradedFarms);
					j('#upgradedPlantationsContainer').val(beanObject.upgradedPlantations);
					j('#coffeeBeansUsedContainer').val(beanObject.coffeeBeansUsed);
					var attr = j('#saveBtn').attr('disabled');
					if (typeof attr !== 'undefined' && attr !== false) {
    						j('#saveBtn').removeAttr('disabled');
					}
					setTimeout(updateDB, 10000);
				};
				
				updateDB();
				");
				
				
					if(isset($_POST['saveBtn']) and $userID != null){
						$currentBeans = (int)$_POST['beanCountContainer'];
						$totalBeans = (int)$_POST['beanTotalContainer'];
						$bps = (int)$_POST['beansPerSecondContainer'];
						$farms = (int)$_POST['farmsContainer'];
						$plantations = (int)$_POST['plantationsContainer'];
						$upFarms = (int)$_POST['upgradedFarmsContainer'];
						$upPlantations = (int)$_POST['upgradedPlantationsContainer'];
						$coffeeUsed = (int)$_POST['coffeeBeansUsedContainer'];
						insertDB($currentBeans, $totalBeans, $bps, $farms, $plantations, $upFarms, $upPlantations, $coffeeUsed, 'ryan');
						getBeanObject($userID);
					}
				?>
		</script>
		
		<script src="./assets/scripts/after.js"></script>
		<link rel="stylesheet" href="assets/css/jqueryui.css">
		<link rel="stylesheet" href="assets/css/beanClicker.css">
	</head>

	<body>
		<div class="fullscreen-bg">
			<video loop muted autoplay class="fullscreen-bg__video">
				<source src="assets/images/Galaxy.webm" type="video/webm">
			</video>
		</div>
		
		<div class="leaderboardBtn">
			Leaderboard
			<div class="leaderboard">
			</div>
		</div>
		
		<div class="statsBtn">
			Stats
		</div>
		
		<div class="stats">
			<span id="statsClose" class="closebtn">&times;</span> 
			<img id='statsRefresh' src='assets/images/refresh-white.png' style=' padding-top: 3px; padding-right: 8px; height: 15px; width: 15px; float: right;' />
			<div class="statsContent"></div>
		</div>
		
		<div id="userin">
			<form method="post">
				<input type="text" id="beanCountContainer" name="beanCountContainer" style="display: none"/>
				<input type="text" id="beanTotalContainer" name="beanTotalContainer" style="display: none"/>
				<input type="text" id="beansPerSecondContainer" name="beansPerSecondContainer" style="display: none"/>
				<input type="text" id="farmsContainer" name="farmsContainer" style="display: none"/>
				<input type="text" id="plantationsContainer" name="plantationsContainer" style="display: none"/>
				<input type="text" id="upgradedFarmsContainer" name="upgradedFarmsContainer" style="display: none"/>
				<input type="text" id="upgradedPlantationsContainer" name="upgradedPlantationsContainer" style="display: none"/>
				<input type="text" id="coffeeBeansUsedContainer" name="coffeeBeansUsedContainer" style="display: none"/>
				<input type="submit" id="saveBtn" name="saveBtn" value="Save" disabled="disabled"/>
			</form>
		</div>
		
		<div id="beanClicker">
			<h2>Bean Clicker</h2><br /><br />
			<span id="beanName"></span><span id="beanCount"></span>
		</div>
		
		<div class="alert">
			<span id="alertClose" class="closebtn">&times;</span> 
			<strong id="alertType"></strong><br /><br /><span id="alertElement"></span>
		</div>
		
		<div id="beanStuff">
			<div id="bean">
				<img id="beanImg" src="./assets/images/bean.png" />
			</div>
			<!--<span id="clickNumber">+1</span>-->
			<div id="clickNumber"></div>
		</div>
		
		<div class="shopHover">
		
		</div>
		
		<div class="store">
			<b>Shop</b>
			<ul>
		
				<li><a href="#Items">Items</a></li>
				<li><a href="#Buidings">Buildings</a></li>
				<li><a href="#Upgrades">Upgrades</a></li>
		
			</ul>
			
			<div id="Items">
			
				<table id="itemsTable" class="shopTables">
				
					<tr>
						<td id="coffeeBean" href="#" title=""> Coffee Bean<br /><span id="coffeeBeanCost" class="cost">50 Beans</span> </td>
					</tr>
					<tr>
						
					</tr>
				
				</table>
				
			</div>
			
			<div id="Buidings">
				<table id="buildingsTable" class="shopTables">
					<tr>
						<td id="farm" href="#" title="">Farm<br /><span id="farmCost" class="cost">500 Beans</span> </td>
					</tr>
					<tr>
						<td id="plantation" href="#" title="">Plantation<br /><span id="plantationCost" class="cost">1000 Beans</span> </td>
					</tr>
				</table>
			</div>
			<div id="Upgrades">
				<table id="upgradesTable" class="shopTables">
					<tr>
						<td id="upgradedFarm" href="#" title="">Upgraded Farm<br /><span id="upgradedFarmCost" class="cost">2500 Beans</span> </td>
					</tr>
					<tr>
						<td id="upgradedPlantation" href="#" title="">Upgraded Plantation<br /><span id="upgradedPlantationCost" class="cost">5000 Beans</span> </td>
					</tr>
				</table>
			</div>
			
			<br />
			
			<input type="button" value="Purchase" id="storeBuyBtn"/>
		</div>
		
		<div class="info">
			<table>
				<tr>
					<td>Farms: <span id="farmSpan"></span></td>
					<td>Plantations: <span id="plantationSpan"></td>
					<td><span id="beansPerSecond"></td>
				</tr>
			</table>
		</div>
	</body>

</html>
