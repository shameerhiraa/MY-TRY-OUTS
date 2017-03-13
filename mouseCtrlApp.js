var mgApp = angular.module('mgApp',["ngRoute"]);
//var theApp = angular.module("theApp",[])
mgApp.run(function($rootScope,$location){
	$rootScope.stages = ['00','01','02','03'];
	$rootScope.currentStageIdx = 0;
	
	$rootScope.increaseOneStep = function(){
		$rootScope.currentStageIdx++;
		console.log($rootScope.stages[$rootScope.currentStageIdx])
		$location.path($rootScope.stages[$rootScope.currentStageIdx])
	}
})

mgApp.config(function($routeProvider){
	//console.log('route')
	$routeProvider.
	when("/00",{
		templateUrl:'views/00.html',
		controller:'startSceneCtrl'
	}).when("/01",{
		templateUrl:'views/01.html',
		controller:'startSceneCtrl'
	}).otherwise({redirectTo:'00'})
})


mgApp.controller('startSceneCtrl',function($scope,$rootScope,$location){
	
})

mgApp.directive('pathDir',function(){
	
	
	
})
