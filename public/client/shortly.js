angular.module('shortly', ['ngRoute', 'ngCookies'])
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
    .when('/signup',{
      templateUrl: 'templates/signup.html',
      controller: 'signupController'
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
}).controller('signupController', function($scope, $http, $cookies){
  $scope.postNewUser = function(){
    $http({
      method: 'POST',
      url: '/api/signup',
      data: {
        username: this.userName,
        password: this.userPass
      }
    }).success(function(data, status, headers, config) {
      console.log('Success!', data);
      // set cookie data.token
      $cookies.userToken = data.token;
      //redirect somewhere.


    }).error(function(err){
      console.log('Error!', err);
    });
  };
});