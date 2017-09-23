
//create a module using the Angular objects module() method
//inject two dependencies to our module. ngRoute for routing to different "pages" 
//and ngTouch for detecting swiping on touch devices
var mapApp = angular.module("mapModule", ['ngRoute', 'ngTouch', 'ngMap']);

//configure our routes
mapApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			//route for the home page
			templateUrl : 'views/home.html',
			controller : 'homeController'
		})
		.when('/map', {
			//route for the to do list page
			templateUrl : 'views/map.html',
			controller : 'mapController'
		});
});

//create a factory so that we can pass these variables between different controllers. see ref above.
mapApp.factory('todoListFactory', function() {
  	//private variables
  	var _activityList = [];
	var _tasks =[];
	
  	//return public API so that we can access it in all controllers
  	return {
    		activityList: _activityList, tasks: _tasks
 	};
});

//create the mainController which will be associated with the body of the index file as we will use this controller throughout all
//"pages" for the header menu items and side panel menu.
mapApp.controller("mainController", function($scope){

	//the boolean variable "panelIsOpen" will initially be set to false as the side panel with initially be closed on page load
	var panelIsOpen = false;

	//create an array of objects storing information on our menu items for the header of all "pages"
	//store the relevant icons and hrefs for each menu item 
	var menuItems = [{'name':'Home', 'href': '#/', 'font_awesome_icon' : 'fa-home'}, 
			{'name': 'To Do List', 'href': '#todo', 'font_awesome_icon' : 'fa-pencil'},
			{'name': 'Activity Log', 'href': '#history', 'font_awesome_icon' : 'fa-history'}];


	//add the menuItems array to scope
	$scope.menuItems = menuItems;
	//add the panelIsOpen boolean variable to scope
	$scope.panelIsOpen = panelIsOpen;

	$scope.toggleSidePanel = function(){
		//this function checks if the boolean variable "panelIsOpen" is currently true or false.
		//if it is false when the user presses the toggle button it means the panel is currently closed so therefore 
		//we should open it now. and then set panelIsOpen to true. 
		//in our html we use the ng-class directive to add the swipe_left class when panelIsOpen is true.

		if($scope.panelIsOpen == false){
			$scope.panelIsOpen = true;
		}else if($scope.panelIsOpen == true){
			$scope.panelIsOpen = false;
		}
	}
	$scope.selectMenuItem = function($index){
		//this function is called whenever a menu item is clicked. It takes in the index of the current list item
		//in our html we use the ng-class directive to add the "current" class to a list item whenever the condition $index == selectedItem is true.
		//the "current" class adds some css styling to the selected item to show the user which menu item is currently selected.
		$scope.selectedItem = $index; 
	}
 $scope.$on('$viewContentLoaded', function(){
console.log('content');

	if(document.getElementById('map')){
console.log('yes');
		//check if this element exists
	function initMap() {
var positions = [{latLng: {lat: 53.41291, lng: -8.24389}, url: "/"},{latLng: {lat: 53.3498053, lng: -6.2603097}, url: "/"}];


var map = new google.maps.Map(document.getElementById('map'), {
zoom: 7,
center: positions[0].latLng
});

for (var i = 0; i < positions.length; i++) {
(function(position) {
var marker = new google.maps.Marker({
map: map,
position: position.latLng,
url: position.url
});
google.maps.event.addDomListener(marker, 'click', function() {
window.location.href = marker.url;
});
})(positions[i]);
}
}
	}
    //Here your view content is fully loaded !!
  });


angular.element(document).ready(function () {
    console.log('page loading completed');
	if(document.getElementById('map')){
console.log('yes2');
}
});

});


//create the homeController for the home.html view
mapApp.controller("homeController", function($scope){
	$scope.pageHeading = "Home"; //this will be inserted to a h2 tag
	$scope.introParagraph = "Welcome to the to do app. The easy way to keep track of your daily/weekly tasks!"
	
	$scope.selectMarker = function(){
		console.log('marker selected');
	}



});


//create the homeController for the home.html view
mapApp.controller("mapController", function($scope){
	$scope.pageHeading = "Map"; //this will be inserted to a h2 tag
	$scope.introParagraph = ""
});


