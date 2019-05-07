(function(){

	var ChatApp = angular.module("ChatApp");

	var ChatService = function($http){

		var signup = function(data){
			return $http.post("http://localhost:1000/user",data).then(function(res,err){
				return res;
			});
		};

		return {
			signup: signup
		};

	};

	ChatApp.factory("ChatService",ChatService);

})();