var mgApp = angular.module('mgApp',["ngRoute"]);
//var theApp = angular.module("theApp",[])
mgApp.run(function($rootScope,$location){
	$rootScope.stages = ['00','01','02','03'];
	$rootScope.currentStageIdx = 0;
	$rootScope.isPlaying = false;
	
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
			
			var alpha = $(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[3]
			//console.log(alpha)
			var hex = $(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[0].toString(16)+$(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[1].toString(16)+$(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[2].toString(16);

			//console.log(sc.isPlaying)
			
			//console.log(alpha)
			console.log(hex)
			if(sc.isPlaying && alpha == 0){
				sc.isPlaying = false;
				console.log('FAILED')
				
			}
			
			if(hex == '7afea' && !sc.isPlaying){
				sc.isPlaying = true;
				console.log('Started')
				
				
			}
			
			if((hex == 'c692'|| hex == '0660')&& sc.isPlaying){
				sc.isPlaying = false;
				console.log('WON THE STAGE')
			}
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
