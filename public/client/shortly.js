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
    .when('/login',{
      templateUrl: 'templates/signup.html',
      controller: 'loginController'
    })
    .otherwise({redirectTo: '/'});

})
.controller('MainController', function($scope, $http, $cookies, $location) {
  if ($cookies.userToken){
    $http({
      method: 'GET',
      url: '/links'
    }).success(function(data){
      $scope.links = data;
    });
  } else {
    $location.path('/signup'); // CHANGE THIS TO LOGIN WHEN WE CREATE LOGIN
  }

})
.controller('ShortenController', function($scope, $http, $cookies, $location) {
  if (!$cookies.userToken){
    $location.path('/signup'); // CHANGE THIS TO LOGIN WHEN WE CREATE LOGIN
  } else {
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
  }
})

.controller('signupController', function($scope, $http, $cookies, $location){

  // Check if user is logged in.
  if($cookies.userToken) {
    $location.path('/');
  }

  $scope.postNewUser = function(){
    // console.log(this);

    $http({
      method: 'POST',
      url: '/api/signup?username=' + this.userName + '&password=' + this.userPass,
    }).success(function(data, status, headers, config) {
      console.log('Success!', data);
      // set cookie data.token
      $cookies.userToken = data.token;
      //redirect somewhere.
      $location.path("/");

    }).error(function(err){
      console.log('Error!', err);
    });
  };
});