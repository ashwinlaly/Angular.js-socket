(function(){
	var ChatApp = angular.module("ChatApp");

	var SignupController = function($scope,ChatService){
		$scope.signup = function(){
			ChatService.signup($scope.user)
		}
	};

	ChatApp.controller("SignupController",SignupController);

})();