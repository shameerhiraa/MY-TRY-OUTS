var theApp = angular.module('listingApp', [])
theApp.controller('listingCtrl',['$scope','$http',function($scope,$http){
 
    $http.get('http://labsls.com/shameer/angular/capital-list.json').success(function(d){
      $scope.list = d;                                                          
    })
    $scope.sortOrder = 'Country';
    $scope.reverse = true;
                                
}])