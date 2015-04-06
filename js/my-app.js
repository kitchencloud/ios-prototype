// Initialize your app
var myApp = new Framework7({
	precompileTemplates: true,
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

//Our User 
var userHTML = Template7.templates.userTemplate({
    name: 'Zachary Hall',
    age: 27,
    username: 'zach_hall'
});

//Swiping Media Content Left to Right
var mySwiper = myApp.swiper('.swiper-container', {
    pagination:'.swiper-pagination'
});

//Push Notifications 
/*$$(this).on('load', function () {
	myApp.addNotification({
		title: 'Spilt Milk',
		message: 'This is a simple notification message with custom icon and subtitle',
		media: '<i class="fa fa-cloud fa-2x" style="color: orange;"></i>'
	});
});*/

//Remove Items 
$$(".fa-times").on('click', function () {
	$$(this).parent().remove();
});

//Camera Basic UI
$$(".viewport").addClass("hide");

$$("#scan_btn").on('click', function() {
	$$(".viewport").removeClass("show");
	$$(this).hide();
});
	
//Notification functions
$$('.empty-message').hide();
/*if($$('.notification:visible').length === 0){
	$$('.empty-message').show();
} else {
	$$('.empty-message').hide();
};*/

//Interaction for the list items
$$(".checkbox").click(function(){
	if ($$(".checkbox").is(":checked")) {
		$$("#item").remove();
	} else {
		$$("#item").show();
	}
});
	

//Particular function for the item details screen
myApp.onPageInit('details', function(page){
	
	var randomScalingFactor = function(){ return Math.round(Math.random()*5)};
    var purchaseChartData = {
        labels : ["Oct", "Nov"],
        datasets : [
            {
                label: "Activity for: ",
                fillColor : "rgba(250,221,153,0.2)",
                strokeColor : "rgba(224,143,80,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#e08f50",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]
    }

    var ctxPurchase = document.getElementById("purchase_chart").getContext("2d");
    window.myLine = new Chart(ctxPurchase).Line(purchaseChartData, {responsive: true});
	
});

//UI Functionality for the grocery list
myApp.onPageInit('list', function(page){
	$$('.add-btn').hide();
	
	$$('#add_item').focus(function() {
		$$('#speech_input').hide();
		$$('.add-btn').show();
	});
	
	$$('.add-btn').on('click', function(e) {
		e.preventDefault();
		
		var listItem = innerHTML = '<li id="item"> <label class="label-checkbox item-content"> <input type="checkbox" name="my-checkbox" value="Milk"> <div class="item-media"> <i class="icon icon-form-checkbox"></i> </div> <div class="item-inner">'+ $$('#add_item').val(); +'</div> </label> </li>';
		
		if($$('#add_item').val().length === 0){
			myApp.alert('It appears you forgot to add your item', 'Item not Added');
		} else {
			$$('ul').append(listItem);
			//$$(this).removeAttr('value');
		}
	});
	
	$$('#item input[type=checkbox]').change(function(){
		$$(this).each(function() {
			if($$(this).is(':checked')) {
				$$('#item').addClass('checked');
				$$('#item .item-inner').addClass('strikeout');
			} else {
				$$('#item').removeClass('checked');
				$$('#item .item-inner').removeClass('strikeout');
			}
		});
	});
	
	$$('.coupon-alert').on('click', function() {
		myApp.alert('Please share this mobile coupon with your cashier upon checkout', 'Coupon Applied Like a Boss');
		$$(this).css({'opacity':'0.3'});
	});
});

//Initializes the charts on the analytics page
myApp.onPageInit('anayltics', function(page){
	
	var doughnutData = [
				{
					value: 300,
					color:"#6aa9d4"
				},
				{
					value: 50,
					color: "#46BFBD"
				},
				{
					value: 100,
					color: "#f1e786"
				},
				{
					value: 40,
					color: "#e08f50"
				},
				{
					value: 120,
					color: "#dc5655"
				}

			];
			

    var randomScalingFactor = function(){ return Math.round(Math.random()*12)};
    var lineChartData = {
        labels : ["8am","10am","12pm","2pm","4pm","6pm","8pm"],
        datasets : [
            {
                label: "Activity for: ",
                fillColor : "rgba(250,221,153,0.2)",
                strokeColor : "rgba(224,143,80,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#e08f50",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]
    }

    var ctxLine = document.getElementById("line_chart").getContext("2d");
    window.myLine = new Chart(ctxLine).Line(lineChartData, {responsive: true});
	
	var ctxDoughnut = document.getElementById("chart_area").getContext("2d");
	window.myDoughnut = new Chart(ctxDoughnut).Doughnut(doughnutData, {responsive : true});
});

//Particular function for the recipes screen
myApp.onPageInit('recipe-details', function(page){
	  //Hidden Objects and Elements
	  $$('.added').hide();
	  $$('.comments').hide();
	  
	  // Social Sharing Feature
	  $$('.fa-share-alt').on('click', function () {
		var buttons = [
			{
				text: innerHTML = '<i class="fa fa-twitter"></i> Tweet This',
				onClick: function () {
					myApp.alert('Button1 clicked');
				}
			},
			{
				text: innerHTML = '<i class="fa fa-facebook"></i> Share of Facebook',
				onClick: function () {
					myApp.alert('Button2 clicked');
				}
			},
			{
				text: innerHTML = '<i class="fa fa-pinterest"></i> Pin This',
				color: 'red',
				onClick: function () {
					myApp.alert('Cancel clicked');
				}
			},
		];
		myApp.actions(buttons);
	});
	
	//Missing Ingridients
	if ($$('li.item .item-inner span.absent').hasClass('absent')) {  
      	$$('button.missing').show();
   	} else {
		$$('button.missing').hide();
	};
   
	$$('.missing').on('click', function() {
		myApp.alert('Missing ingredients have been added to your shopping list', 'Experience Points Earned!'); 
		/*function() {
			myApp.actions(buttons);
		});*/
	});
	
	//Adding a Favorite
	$$('.favorite').on('click', function() {
		$$('.pre-add').hide();
		$$('.added').show();
	});
});

//Interactions for the Sign-up Page
myApp.onPageInit('sign-up', function(page){
	$$('.password-modal').on('click', function () {
    	myApp.modalPassword('Enter a new password please:', 'Lets change things', function (password) {
    		myApp.alert('Your new password is: ' + password + '. An email has been forwarded to you. Keep it somewhere safe.', 'Nice!');
   		});
	});
});

//Interactions for the Signed In User
myApp.onPageInit('signed-in', function(page){
	$$('.password-modal').on('click', function () {
    	myApp.modalPassword('Enter a new password please:', 'Lets change things', function (password) {
    		myApp.alert('Your new password is: ' + password + '. An email has been forwarded to you. Keep it somewhere safe.', 'Nice!');
   		});
	});
});