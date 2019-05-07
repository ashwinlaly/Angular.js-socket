(function(){

	var ChatApp = angular.module("ChatApp",["ngRoute"])

	ChatApp.config(function($routeProvider,$locationProvider){
		$routeProvider
			.when("/",{
				templateUrl:"/views/Indexchat.html",
			})
			.when("/signin",{
				templateUrl:"/views/signin.html",
				controller: "SigninController"
			})
			.when("/signup",{
				templateUrl:"/views/signup.html",
				controller: "SignupController"
			});
	});

})();