///////////////////////////MISC//////////////////////////////////////////////
function updateCounters(){
	j("#beanCount").text("Beans: " + beanObject.beanCounter);
	j("#farmSpan").text(beanObject.farms + beanObject.upgradedFarms);
	j("#plantationSpan").text(beanObject.plantations + beanObject.upgradedPlantations);
	j("#beansPerSecond").text("Beans per second: "+(beanObject.farms*0.1+beanObject.plantations*0.3+beanObject.upgradedFarms*0.5+beanObject.upgradedPlantations));
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

function refreshStats() {
	j(".statsContent").html("<p id='statsTitle' style='text-align: center; font-weight: bold;'>Stats</p><br /> User: " + beanObject.username + "<br /><br /> Current Beans: " + beanObject.beanCounter + "<br /><br /> Total Beans: " + beanObject.beansTotal + "<br /><br /> Beans Per Second: " + (beanObject.farms*0.1+beanObject.plantations*0.3+beanObject.upgradedFarms*0.5+beanObject.upgradedPlantations) + "<br /><br /> Farms: " + beanObject.farms + "<br /><br /> Plantations: " + beanObject.plantations + "<br /><br /> Upgraded Farms: " + beanObject.upgradedFarms + "<br /><br /> Upgraded Plantations: " + beanObject.upgradedPlantations + "<br /><br />Achievements Unlocked:");
	Object.keys(achievementsUnlocked).forEach(key => {
		if(achievementsUnlocked[key] == 1){
			j(".statsContent").append("<br /><br />"+key);		
		}
	});
}

///////////////////////////////////////////SHOP////////////////////////////////////////////////////////

/////////////////////////////FONT COLORS///////////////////////////////////////
function changeCostColor(){
	
	if(beanObject.beanCounter >= 50){
		j("#coffeeBeanCost").css("color", "green");
	}
	else{
		j("#coffeeBeanCost").css("color", "red");
	}
	if(beanObject.beanCounter >= 500){
		j("#farmCost").css("color", "green");
	}
	else{
		j("#farmCost").css("color", "red");
	}
	if(beanObject.beanCounter >= 1000){
		j("#plantationCost").css("color", "green");
	}
	else{
		j("#plantationCost").css("color", "red");
	}
	if(beanObject.beanCounter >= 2500){
		j("#upgradedFarmCost").css("color", "green");
	}
	else{
		j("#upgradedFarmCost").css("color", "red");
	}
	if(beanObject.beanCounter >= 5000){
		j("#upgradedPlantationCost").css("color", "green");
	}
	else{
		j("upgradedPlantationCost").css("color", "red");
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
		beanObject.beanCounter += (3 * beanObject.plantations);
		beanObject.beansTotal += (3 * beanObject.plantations);
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
		beanObject.beanCounter += (10 * beanObject.upgradedPlantations);
		beanObject.beansTotal += (10 * beanObject.upgradedPlantations);
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
		achievementsUnlocked["addictionBegins"] = 1;
	}
	if(beanObject.coffeeBeansUsed == 10){
		customAlert("achievement", "coffeeDependent");
		achievementsUnlocked["coffeeDependent"] = 1;
	}
	if(beanObject.coffeeBeansUsed == 20){
		customAlert("achievement", "coffeeAddict");
		achievementsUnlocked["coffeeAddict"] = 1;
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
	beanObject.plantations--;
	beanObject.upgradedPlantations++;
	updateCounters();
	
	if(beanObject.upgradedPlantations == 1){
		upgradedPlantationTimer();
	}
}

//---------------------------------------------------------------------

////////////////////////////ON READY////////////////////////////////////////

j(function() {
	///////////////////////////UI///////////////////////////////////////////
	//init. tabs
	j(".store").tabs({});
	
	j("#user").on("keyup", function() {
		beanObject.username = j("#user").val();
		j("#beanName").text(j(this).val() + "'s ");
		updateCounters();
	});
	//Updates counters at bottom, current and total beans
	updateCounters();
	changeCostColor();
	farmTimer();
	plantationTimer();
	upgradedFarmTimer();
	
	j('#userinform').submit(function() {
	    updateVars();
	    return true; // return false to cancel form action
	});
		
	//---------------------------------------------------------------------
	//Open stats page when button clicked
	j(".statsBtn").on("click", function() {
		j(".stats").css({"display": "block", "padding-left": "10px"});
		refreshStats();
		//Change cursor when hovering refresh image
		j("#statsRefresh").on('mouseover', function(){
			j(this).attr('src', 'assets/images/refresh-black.png');
		});
		j("#statsRefresh").on('mouseout', function(){
			j(this).attr('src', 'assets/images/refresh-white.png');
		});
		//refresh the stats page when image clicked
		j("#statsRefresh").on('click', function() {
			refreshStats();
		});
		//Remove stats div when closed
		j("#statsClose").on("click", function() {
			j(".stats").css("display","none");
		});
	});
	//---------------------------------------------------------------------
	//Remove alert when clicked
	j("#alertClose").on("click", function() {
		j(".alert").css("display","none");
		j("#alertElement").text("");
	});
	//---------------------------------------------------------------------
	
	//////////////////////////BEAN_IMG/////////////////////////////////////
	//disable dragging to not mess with the bean image click
	j("#beanImg").on("dragstart", function() {
		return false;
	});
	
	j("#beanImg").on("mouseover", function() {
		j(this).css("transform", "scale(1.1)");
	});
	
	j("#beanImg").on("mouseout", function() {
		j(this).css("transform", "scale(1.0)");
	});
	
	//When you click down on the beanImg
	j("#beanImg").mousedown( function(e) {
		//bounce(2, '10px'); //enable this if you want the bean to bounce after being clicked
		beanObject.beanCounter +=(1 * beanMultiplier);
		beanObject.beansTotal += (1 * beanMultiplier);
		updateCounters();
		changeCostColor();
		//------------------------------------------------------------------------
		//text for the +1 when you click
		var clickObj = j("#clickNumber").clone();
		j("body").append(clickObj);
		clickObj.html("+"+beanMultiplier);
		clickObj.css('position','absolute');
		clickObj.offset({left: e.pageX-10, top: e.pageY-25});
		clickObj.animate({"top": "-=40px"}, 500, "linear");
		clickObj.animate({"opacity": 0, "top": "-=40px"}, 500, "linear", function() {
			j(this).remove();
		});
		//------------------------------------------------------------------------
		j("#beanImg").css("transform", "scale(0.95)"); //make bean smaller
		j("#beanImg").css("cursor", "grabbing");
	});
	
	//When you release the mouse button from the beanImg
	j("#beanImg").mouseup(function() {
		//$("#beanImg").finish(); //if bounce is enabled, enable this as well or else animations will run longer than wanted
		j("#beanImg").css("transform", "scale(1.1)");	//return bean size to original size
		j("#beanImg").css("cursor", "grab");
		//----------------Clicking Achievements---------------------------
		if(beanObject.beansTotal == 100){
			if(achievementsUnlocked["beans100"] == 0){
				customAlert("achievement", "beans100");
				achievementsUnlocked["beans100"] = 1;
			}
		}
		if(beanObject.beansTotal == 1000){
			if(achievementsUnlocked["beans1000"] == 0){
				customAlert("achievement", "beans1000");
				achievementsUnlocked["beans1000"] = 1;
			}
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
	
	j("#storeBuyBtn").on("click", function() {
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
