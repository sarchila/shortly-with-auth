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
      templateUrl: 'templates/signin.html',
      controller: 'signinController'
    })
    .when('/login',{
      templateUrl: 'templates/signin.html',
      controller: 'signinController'
    })
    // .otherwise({redirectTo: '/'});

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
    $location.path('/login');
  }
})
.controller('ShortenController', function($scope, $http, $cookies, $location) {
  if (!$cookies.userToken){
    $location.path('/login');
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

.controller('signinController', function($scope, $http, $cookies, $location){

  $scope.signin = $location.path().slice(1);
  
  // Checks if user is logged in
  if($cookies.userToken) {
    $location.path('/');
  }

  $scope.handleUser = function(){
    $http({
      method: 'POST',
      url: '/api' + $location.path(),
      params: {
        username: this.userName,
        password: this.userPass
      }
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