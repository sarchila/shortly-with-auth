angular.module('shortly', ['ngRoute'])
.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'templates/listView.html',
      controller: 'MainController'
    })
    .when('/shorten',{
      templateUrl: 'templates/shorten.html',
      controller: 'ShortenController'
    })
    .otherwise('/');

})
.controller('MainController', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/links'
  }).success(function(data){
    $scope.links = data;
  });

})
.controller('ShortenController', function($scope, $http) {
  $scope.linkSubmit = function(){
    $http({
      method: 'POST',
      url: '/links',
      data: { url: this.url }
    }).success(function(data){
      $scope.url = '';
      console.log('Success!', data);
    }).error(function(err){
      console.log('Error!', err);
    });
  };
});