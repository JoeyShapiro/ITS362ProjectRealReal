var beanObject = { //for the username and the number of beans *needs the achievements
	userID: "",
	beanCounter: 0,
	beansTotal: 0,
	beansPerSecond: 0,
	farms: 0,
	plantations: 0,
	upgradedFarms: 0,
	upgradedPlantations: 0,
	coffeeBeansUsed: 0,
	achievementsUnlocked: {
		"beans100": false,
		"beans1000": false,
		"addictionBegins": false,
		"coffeeDependent": false,
		"coffeeAddict": false
	}
};
var beanMultiplier = 1;
var shopSelected = "";

///////////////////////////////ALERTS////////////////////////////////////////

function customAlert(type, reason){
	if(type == "error"){
		$("#alertType").text("Error:");
		$(".alert").css({"background-color": "red", "color": "black", "display": "inline-block"});
		var errors = {
			"noShopSelected": "You must select an item first!",
			"notEnoughBeans": "You do not have enough beans for that!",
			"farmRequired": "You must purchase a farm first!",
			"plantationRequired": "You must purchase a plantation first!"
		};
		$("#alertElement").text(errors[reason]);
	}
	//-----------------------------------------------------------------------
	else{
		$("#alertType").text("Achievement Unlocked:");  
		$(".alert").css({"background-color": "#007fff", "color": "white", "display": "inline-block"}); 
		var achievements = {
			"beans100": "Earn 100 beans!",
			"beans1000": "Earn 1,000 beans!",
			"addictionBegins": "The addiction begins!",
			"coffeeDependent": "Caffeine Dependent",
			"coffeeAddict": "Coffee Addict"
		};
		$("#alertElement").text(achievements[reason]);
	}
};

///////////////////////////MISC//////////////////////////////////////////////

function updateCounters(){
	$("#beanCount").text("Beans: " + beanObject.beanCounter);
	$(".leaderboard").text(beanObject.userID + ":" + beanObject.beansTotal);
	$("#farmSpan").text(beanObject.farms + beanObject.upgradedFarms);
	$("#plantationSpan").text(beanObject.plantations + beanObject.upgradedPlantations);
	$("#beansPerSecond").text("Beans per second: "+beanObject.beansPerSecond.toFixed(1));
}

/*
//Bounce animation for when bean is clicked
function bounce(times, distance) {
	for(var i = 0; i < times; i++) {
		$("#beanImg").animate({marginTop: '-='+distance}, 100)
		.animate({marginTop: '+='+distance}, 100);
	}        
}
*/

//Changes the color of the shop item selected
function toggleShopSelect(item){
	if( $(item).css("background-color") != "rgba(0, 0, 0, 0)" ){
			$(item).css("background-color", "rgba(0,0,0,0)");
			shopSelected = ""; //if already selected, unselect
		}
	else{
		$(".shopTables td").css("background-color", "rgba(0, 0, 0, 0)"); //make every td lightgray
		$(item).css("background-color", "gray"); //make selected gray
	}
}

function refreshStats() {
	$(".statsContent").html("<p id='statsTitle' style='text-align: center; font-weight: bold;'>Stats</p><br /> User: " + beanObject.userID + "<br /><br /> Current Beans: " + beanObject.beanCounter + "<br /><br /> Total Beans: " + beanObject.beansTotal + "<br /><br /> Beans Per Second: " + beanObject.beansPerSecond + "<br /><br /> Farms: " + beanObject.farms + "<br /><br /> Plantations: " + beanObject.plantations + "<br /><br /> Upgraded Farms: " + beanObject.upgradedFarms + "<br /><br /> Upgraded Plantations: " + beanObject.upgradedPlantations);
}

///////////////////////////////////////////SHOP////////////////////////////////////////////////////////

/////////////////////////////FONT COLORS///////////////////////////////////////
function changeCostColor(){
	
	if(beanObject.beanCounter >= 50){
		$("#coffeeBeanCost").css("color", "green");
	}
	else{
		$("#coffeeBeanCost").css("color", "red");
	}
	if(beanObject.beanCounter >= 500){
		$("#farmCost").css("color", "green");
	}
	else{
		$("#farmCost").css("color", "red");
	}
	if(beanObject.beanCounter >= 1000){
		$("#plantationCost").css("color", "green");
	}
	else{
		$("#plantationCost").css("color", "red");
	}
	if(beanObject.beanCounter >= 2500){
		$("#upgradedFarmCost").css("color", "green");
	}
	else{
		$("#upgradedFarmCost").css("color", "red");
	}
	if(beanObject.beanCounter >= 5000){
		$("#upgradedPlantationCost").css("color", "green");
	}
	else{
		$("upgradedPlantationCost").css("color", "red");
	}
}

/////////////////////////////TIMERS//////////////////////////////////////////

function coffeeBeanTimer() {
	beanMultiplier = 2;
	setTimeout( function() {
		beanMultiplier = 1;  //after 10 seconds, change the multiplier back to normal
    }, 10000);
}
//-----------------------------------------------
function farmTimer(){
	if(beanObject.farms > 0){
		beanObject.beanCounter += (1 * beanObject.farms);
		beanObject.beansTotal += (1 * beanObject.farms);
		updateCounters();
		setTimeout(farmTimer, 10000);
	}
}
//-----------------------------------------------
function plantationTimer(){
	if(beanObject.plantations > 0){
		beanObject.beanCounter += (10 * beanObject.plantations);
		beanObject.beansTotal += (10 * beanObject.plantations);
		updateCounters();
		setTimeout(plantationTimer, 10000);
	}
}
//-----------------------------------------------
function upgradedFarmTimer(){
	if(beanObject.upgradedFarms > 0){
		beanObject.beanCounter += (5 * beanObject.upgradedFarms);
		beanObject.beansTotal += (5 * beanObject.upgradedFarms);
		updateCounters();
		setTimeout(upgradedFarmTimer, 10000);
	}
}
//-----------------------------------------------
function upgradedPlantationTimer(){
	if(beanObject.upgradedPlantations > 0){
		beanObject.beanCounter += (50 * beanObject.upgradedPlantations);
		beanObject.beansTotal += (50 * beanObject.upgradedPlantations);
		updateCounters();
		setTimeout(upgradedPlantationTimer, 10000);
	}
}

////////////////////////ITEMS///////////////////////////////////////////

function coffeeBeanShop(){
	toggleShopSelect("#coffeeBean");
	if(beanObject.beanCounter < 50){
		customAlert("error", "notEnoughBeans");
		return;
	}
	
	beanObject.beanCounter -= 50;
	updateCounters();
	coffeeBeanTimer();
	
	//----------------Coffee Bean Achievements---------------------
	beanObject.coffeeBeansUsed++;
	if(beanObject.coffeeBeansUsed == 1){
		customAlert("achievement", "addictionBegins");
		beanObject.achievementsUnlocked["addictionBegins"] = true;
	}
	if(beanObject.coffeeBeansUsed == 20){
		customAlert("achievement", "coffeeDependent");
		beanObject.achievementsUnlocked["coffeeDependent"] = true;
	}
	if(beanObject.coffeeBeansUsed == 50){
		customAlert("achievement", "coffeeAddict");
		beanObject.achievementsUnlocked["coffeeAddict"] = true;
	}
	//-------------------------------------------------------------
}

function farmShop() {
	toggleShopSelect("#farm");

	if(beanObject.beanCounter < 500){
		customAlert("error", "notEnoughBeans");
		return;
	}

	beanObject.beanCounter -= 501;
	beanObject.beansTotal -= 1;
	beanObject.beansPerSecond += 0.1;
	beanObject.farms++;
	updateCounters();
	
	if(beanObject.farms == 1){
		farmTimer();
	}
}

//--------------------------------------------------------

function plantationShop() {
	toggleShopSelect("#plantation");
	if(beanObject.beanCounter < 1000){
		customAlert("error", "notEnoughBeans");
		return;
	}

	beanObject.beanCounter -= 1010;
	beanObject.beansTotal -= 10;
	beanObject.beansPerSecond += 1;
	beanObject.plantations++;
	updateCounters();
	
	if(beanObject.plantations == 1){
		plantationTimer();
	}
}

//---------------------------------------------------------------------------

function upgradedFarmShop() {
	toggleShopSelect("#upgradedFarm");
	if(beanObject.beanCounter < 2500){
		customAlert("error", "notEnoughBeans");
		return;
	}

	if(beanObject.farms < 1){
		customAlert("error", "farmRequired");
		return;
	}

	beanObject.beanCounter -= 2505;
	beanObject.beansTotal -= 5;
	beanObject.beansPerSecond += 0.4;
	beanObject.farms--;
	beanObject.upgradedFarms++;
	updateCounters();
	
	if(beanObject.upgradedFarms == 1){
		upgradedFarmTimer();
	}
}

//---------------------------------------------------------------------------

function upgradedPlantationShop() {
	toggleShopSelect("#upgradedPlantation");
	if(beanObject.beanCounter < 5000){
		customAlert("error", "notEnoughBeans");
		return;
	}

	if(beanObject.plantations < 1){
		customAlert("error", "plantationRequired");
		return;
	}

	beanObject.beanCounter -= 5050;
	beanObject.beansTotal -= 50;
	beanObject.beansPerSecond += 4;
	beanObject.plantations--;
	beanObject.upgradedPlantations++;
	updateCounters();
	
	if(beanObject.upgradedPlantations == 1){
		upgradedPlantationTimer();
	}
}

//---------------------------------------------------------------------

////////////////////////////ON READY////////////////////////////////////////

$(function() {
	///////////////////////////UI///////////////////////////////////////////
	//init. tabs
	$(".store").tabs({});
	
	$("#user").on("keyup", function() {
		beanObject.userID = $("#user").val();
		$("#beanName").text($(this).val() + "'s ");
		updateCounters();
	});
	//Updates counters at bottom, current and total beans
	updateCounters();
	//---------------------------------------------------------------------
	//Leaderboard button
	$(".leaderboardBtn").on("click", function() {
		$(".leaderboard").toggle("slide", {direction: "up"});
	});
	//---------------------------------------------------------------------
	//Open stats page when button clicked
	$(".statsBtn").on("click", function() {
		$(".stats").css({"display": "block", "padding-left": "10px"});
		refreshStats();
		//Change cursor when hovering refresh image
		$("#statsRefresh").on('mouseover', function(){
			$(this).attr('src', 'assets/images/refresh-black.png');
		});
		$("#statsRefresh").on('mouseout', function(){
			$(this).attr('src', 'assets/images/refresh-white.png');
		});
		//refresh the stats page when image clicked
		$("#statsRefresh").on('click', function() {
			refreshStats();
		});
		//Remove stats div when closed
		$("#statsClose").on("click", function() {
			$(".stats").css("display","none");
		});
	});
	//---------------------------------------------------------------------
	//Remove alert when clicked
	$("#alertClose").on("click", function() {
		$(".alert").css("display","none");
		$("#alertElement").text("");
	});
	//---------------------------------------------------------------------
	////////////////////////////COOKIES////////////////////////////////////
	//Load the beanObject saved within the cookies
	$("#loadCookies").click(function() {
		beanObject = JSON.parse(document.cookie);
		updateCounters();
		changeCostColor();
		farmTimer();
		plantationTimer();
		upgradedFarmTimer();
		upgradedPlantationTimer();
	});
	
	//Save the cookies for the given user name
	$("#saveCookies").on("click", function() {
		document.cookie = JSON.stringify(beanObject);
	});
	
	//////////////////////////BEAN_IMG/////////////////////////////////////
	//disable dragging to not mess with the bean image click
	$("#beanImg").on("dragstart", function() {
		return false;
	});
	
	$("#beanImg").on("mouseover", function() {
		$(this).css("transform", "scale(1.1)");
	});
	
	$("#beanImg").on("mouseout", function() {
		$(this).css("transform", "scale(1.0)");
	});
	
	//When you click down on the beanImg
	$("#beanImg").mousedown( function(e) {
		//bounce(2, '10px'); //enable this if you want the bean to bounce after being clicked
		beanObject.beanCounter +=(1 * beanMultiplier);
		beanObject.beansTotal += (1 * beanMultiplier);
		updateCounters();
		changeCostColor();
		//------------------------------------------------------------------------
		//text for the +1 when you click
		var clickObj = $("#clickNumber").clone();
		$("body").append(clickObj);
		clickObj.html("+"+beanMultiplier);
		clickObj.css('position','absolute');
		clickObj.offset({left: e.pageX-10, top: e.pageY-25});
		clickObj.animate({"top": "-=40px"}, 500, "linear");
		clickObj.animate({"opacity": 0, "top": "-=40px"}, 500, "linear", function() {
			$(this).remove();
		});
		//------------------------------------------------------------------------
		$("#beanImg").css("transform", "scale(0.95)"); //make bean smaller
		$("#beanImg").css("cursor", "grabbing");
	});
	
	//When you release the mouse button from the beanImg
	$("#beanImg").mouseup(function() {
		//$("#beanImg").finish(); //if bounce is enabled, enable this as well or else animations will run longer than wanted
		$("#beanImg").css("transform", "scale(1.1)");	//return bean size to original size
		$("#beanImg").css("cursor", "grab");
		//----------------Clicking Achievements---------------------------
		if(beanObject.beansTotal == 100 && beanObject.achievementsUnlocked["beans100"] == false){
			customAlert("achievement", "beans100");
			beanObject.achievementsUnlocked["beans100"] = true;
		}
		if(beanObject.beansTotal == 1000 && beanObject.achievementsUnlocked["beans1000"] == false){
			customAlert("achievement", "beans1000");
			beanObject.achievementsUnlocked["beans1000"] = true;
		}
	});
	
	///////////////////////////SHOP////////////////////////////////////////
	/*
	//Hide the shop on middle mouse click
	$(document).on("mousedown", function(e) {
		if (e && (e.which == 2 || e.button == 4 )){
		 $(".store").toggle("slide", {direction: "right"});
		}
	});
	*/
	
	//Create the tooltips for each shop item
	$( function() {
		$("#coffeeBean").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/smallBean.png" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto;" /><br />Earn 2 beans per click for 10 seconds.'});
		$("#farm").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/farm.jpg" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto; border: 1px solid black;"/><br />Generates 1 Bean every 10 seconds.'});
		$("#plantation").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/plantation.jpg" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto; border: 1px solid black;"/><br />Generates 10 Beans every 10 seconds.'});
		$("#upgradedFarm").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/upgradedFarm.jpg" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto; border: 1px solid black;"/><br />Generates 5 Beans every 10 seconds.<br /><span style="color: red;">Requires at least one farm.</span>'});
		$("#upgradedPlantation").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/upgradedPlantation.jpg" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto; border: 1px solid black;"/><br />Generates 50 Beans every 10 seconds.<br /><span style="color: red;">Requires at least one plantation.</span>'});
	});
	
	//When shop items clicked
	$("#coffeeBean").on("click", function() {
		shopSelected = "coffeeBean";
		toggleShopSelect(this);
	});
	
	$("#farm").on("click", function() {
		shopSelected = "farm";
		toggleShopSelect(this);
	});
	
	$("#plantation").on("click", function() {
		shopSelected = "plantation";
		toggleShopSelect(this);
	});
	
	$("#upgradedFarm").on("click", function() {
		shopSelected = "upgradedFarm";
		toggleShopSelect(this);
	});
	
	$("#upgradedPlantation").on("click", function() {
		shopSelected = "upgradedPlantation";
		toggleShopSelect(this);
	});
	
	//When Purchase button clicked
	$("#storeBuyBtn").on("mousedown", function() {
		$(this).css("background-color", "gray");
	});
	$("#storeBuyBtn").on("mouseup", function() {
		$(this).css("background-color", "darkgray");
	});
	
	$("#storeBuyBtn").on("click", function() {
		switch(shopSelected){
			case "coffeeBean":
				coffeeBeanShop();
			break;
			case "farm":
				farmShop();
			break;
			case "plantation":
				plantationShop();
			break;
			case "upgradedFarm":
				upgradedFarmShop();
			break;
			case "upgradedPlantation":
				upgradedPlantationShop();
			break;
			default:
				customAlert("error", "noShopSelected");
			break;
		};
		changeCostColor();
	});
	//---------------------------------------------------------------------
	//////////////////////////////////////////////////////////////////////

});
