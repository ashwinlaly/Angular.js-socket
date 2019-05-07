(function(){

	var ChatApp = angular.module("ChatApp");

	var ChatController = function($scope){
		$scope.message = "A";
	};

	ChatApp.controller("ChatController",ChatController);

})();