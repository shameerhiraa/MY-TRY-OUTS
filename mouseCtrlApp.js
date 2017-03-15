var mgApp = angular.module('mgApp',["ngRoute"]);
//var theApp = angular.module("theApp",[])
mgApp.run(function($rootScope,$location){
	$rootScope.stages = ['00','01','02','03'];
	$rootScope.currentStageIdx = 0;
	
	$rootScope.increaseOneStep = function(){
		$rootScope.currentStageIdx++;
		//console.log($rootScope.stages[$rootScope.currentStageIdx])
		$location.path($rootScope.stages[1])
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
		controller:'firstStageCtrl'
	}).otherwise({redirectTo:'00'})
})


mgApp.controller('startSceneCtrl',function($scope,$rootScope,$location){
	
})

mgApp.controller('firstStageCtrl',function($scope){
	
})


mgApp.directive('pathCanv',function(){
	
	function theLinkFunction(sc,el,attr){
		
		
		
		var img = new Image();
		
		function onCanvasMouseMove(e){
			
			var img_data = $(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[3]
			console.log(img_data)
		}
		function onCanvasMouseEnter(e){
			
			//var img_data = $(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[3]
			console.log('mouseover')
		}
		
		img.onload = function(){
			console.log('onload success')
			var canv = $(el).get(0).getContext("2d").drawImage(img,0,0,1024,760)
			$(el).on('mousemove',onCanvasMouseMove);
			$(el).on('mouseover',onCanvasMouseEnter)
		}
		img.onerror = function(){
			
			console.log('error')
		}
		
		
		
		img.src = 'images/stage1.svg';
		
	}
	
	
	return{
		
		link:theLinkFunction
		
	}
	
	
	
})
