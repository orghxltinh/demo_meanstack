var ausersApp = angular.module('ausersApp',['ngRoute','auserService','ausersController']);

ausersApp.config(['$routeProvider',function($routeProvider){
        $routeProvider.
            when('/',{
                templateUrl:'/pages/ausers/list.html',
                controller:'listController'
            }).
            when('/signup',{
                templateUrl:'/pages/ausers/create.html',
                controller:'createController'
            }).
            when('/login',{
                templateUrl:'/pages/ausers/login.html',
                controller:'loginController'
            })
        ;
}]);




