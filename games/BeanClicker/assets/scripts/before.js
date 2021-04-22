var j = jQuery.noConflict();
function customAlert(type, reason){
	if(type == 'error'){
		j('#alertType').text('Error:');
		j('.alert').css({'background-color': 'red', 'color': 'black', 'display': 'inline-block'});
		var errors = {
			'noShopSelected': 'You must select an item first!',
			'notEnoughBeans': 'You do not have enough beans for that!',
			'farmRequired': 'You must purchase a farm first!',
			'plantationRequired': 'You must purchase a plantation first!'
		};
		j('#alertElement').text(errors[reason]);
	}

	else{
		j('#alertType').text('Achievement Unlocked:');  
		j('.alert').css({'background-color': '#007fff', 'color': 'white', 'display': 'inline-block'}); 
		var achievements = {
			'beans100': 'Earn 100 beans!',
			'beans1000': 'Earn 1,000 beans!',
			'addictionBegins': 'The addiction begins!',
			'coffeeDependent': 'Caffeine Dependent',
			'coffeeAddict': 'Coffee Addict'
		};
		j('#alertElement').text(achievements[reason]);
	}
};

var shopSelected = "";

//Changes the color of the shop item selected
function toggleShopSelect(item){
	if( j(item).css("background-color") != "rgba(0, 0, 0, 0)" ){
			j(item).css("background-color", "rgba(0,0,0,0)");
			shopSelected = ""; //if already selected, unselect
		}
	else{
		j(".shopTables td").css("background-color", "rgba(0, 0, 0, 0)"); //make every td lightgray
		j(item).css("background-color", "gray"); //make selected gray
	}
}

//Create the tooltips for each shop item
j( function() {
		j("#coffeeBean").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/smallBean.png" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto;" /><br />Earn 2 beans per click for 10 seconds.'});
		j("#farm").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/farm.jpg" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto; border: 1px solid black;"/><br />Generates 1 Bean every 10 seconds.'});
		j("#plantation").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/plantation.jpg" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto; border: 1px solid black;"/><br />Generates 3 Beans every 10 seconds.'});
		j("#upgradedFarm").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/upgradedFarm.jpg" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto; border: 1px solid black;"/><br />Generates 5 Beans every 10 seconds.<br /><span style="color: red;">Requires at least one farm.</span>'});
		j("#upgradedPlantation").tooltip({position: { my: "right center", at: "left center", collision: "none"},content: '<img src="assets/images/upgradedPlantation.jpg" style="margin-left: 42%; margin-right: auto; margin-bottom: 5px; height: auto; border: 1px solid black;"/><br />Generates 10 Beans every 10 seconds.<br /><span style="color: red;">Requires at least one plantation.</span>'});

	//When shop items clicked
	j("#coffeeBean").on("click", function() {
		shopSelected = "coffeeBean";
		toggleShopSelect(this);
	});

	j("#farm").on("click", function() {
		shopSelected = "farm";
		toggleShopSelect(this);
	});

	j("#plantation").on("click", function() {
		shopSelected = "plantation";
		toggleShopSelect(this);
	});

	j("#upgradedFarm").on("click", function() {
		shopSelected = "upgradedFarm";
		toggleShopSelect(this);
	});

	j("#upgradedPlantation").on("click", function() {
		shopSelected = "upgradedPlantation";
		toggleShopSelect(this);
	});

	//When Purchase button clicked
	j("#storeBuyBtn").on("mousedown", function() {
		j(this).css("background-color", "gray");
	});
	j("#storeBuyBtn").on("mouseup", function() {
		j(this).css("background-color", "darkgray");
	});
});

