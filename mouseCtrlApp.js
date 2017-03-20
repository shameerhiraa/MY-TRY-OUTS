var mgApp = angular.module('mgApp',["ngRoute"]);
//var theApp = angular.module("theApp",[])
mgApp.run(function($rootScope,$location){
	$rootScope.stages = ['00','01','02','03','04'];
	$rootScope.currentStageIdx = 0;
	$rootScope.isPlaying = false;
	
	$rootScope.increaseOneStep = function(){
		console.log('increaseOneStep()')
		$rootScope.currentStageIdx++;
		console.log($rootScope.stages[$rootScope.currentStageIdx])
		$location.path(String($rootScope.stages[$rootScope.currentStageIdx]))
		console.log('DONE')
	}
	
	$rootScope.restartGame = function(){
		$rootScope.currentStageIdx = 0;
		$location.path(String($rootScope.stages[$rootScope.currentStageIdx]))
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
	}).when("/02",{
		templateUrl:'views/02.html',
		controller:'secondStageCtrl'
	}).when("/03",{
		templateUrl:'views/03.html',
		controller:'thirdStageCtrl'
	}).otherwise({redirectTo:'00'})
})


mgApp.controller('startSceneCtrl',function($scope,$rootScope,$location){
	console.log('start Ctrl')
	
})

mgApp.controller('firstStageCtrl',function($scope,$rootScope,$location){
	console.log('first Ctrl')

})
mgApp.controller('secondStageCtrl',function($scope,$rootScope,$location){
	console.log('second Ctrl')
})
mgApp.controller('thirdStageCtrl',function($scope,$rootScope,$location){
	console.log('third Ctrl')
	$rootScope.currentStageIdx = 3;
	$scope.scare = false;
})




mgApp.directive('theAudio',function(){
	function theLinkFunction(sc,el,attr){
		console.log('AUDIO LINK FUNCTION')
		console.log(el)
		sc.$watch('scare',function(newVal,oldVal){
			console.log('INSIDE WATCH');
		
			
			if(newVal){
				$(el).get(0).play();
			}
			
		})
		
		
		
	}
	return{
		link:theLinkFunction
		
	}
	
})



mgApp.directive('pathCanv',function(){
	
	function theLinkFunction(sc,el,attr){
		
		console.log('INSIDE LINK FUNCTION')
		
		var img = new Image();
		
		function onCanvasMouseMove(e){
			
			var alpha = $(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[3]
			var hex = $(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[0].toString(16)+$(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[1].toString(16)+$(el).get(0).getContext("2d").getImageData(e.offsetX,e.offsetY,1,1).data[2].toString(16);
			//console.log(sc.currentStageIdx)
			if(sc.isPlaying && alpha == 0){
				sc.isPlaying = false;
				console.log('FAILED')
				sc.restartGame();
				sc.$apply();
			}
			console.log(alpha)
			if(sc.isPlaying && (alpha >= 218 && alpha < 230) && sc.currentStageIdx == 3){
				console.log('sc.scare');
				
				sc.isPlaying = false;
				//sc.increaseOneStep()
				console.log(sc.scare);
				sc.scare = true;
				console.log(sc.scare);
				sc.$apply();
			}
			
			
			if(hex == '7afea' && !sc.isPlaying){
				sc.isPlaying = true;
			//	console.log('Started')
				
				
			}
			
			if((hex == 'c692'|| hex == '0660')&& sc.isPlaying){
				sc.isPlaying = false;
				console.log('WON THE STAGE')
				//console.log(sc.$parent.increaseOneStep())
				$(el).off('mousemove',onCanvasMouseMove);
				$(el).off('mouseover',onCanvasMouseEnter)
				sc.increaseOneStep()
				sc.$apply();
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
		
		//console.log(attr.img)
		
		img.src = attr.img;
		
	}
	
	
	return{
		
		link:theLinkFunction
		
	}
	
	
	
})
