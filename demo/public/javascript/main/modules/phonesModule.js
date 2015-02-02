var phoneModule = angular.module('phoneModule',['ngRoute','phonesServices','phonesController']);

phoneModule.config(['$routeProvider','$interpolateProvider',function($routeProvider,$interpolateProvider){
                
    $routeProvider.
        when('/',{
            templateUrl:'pages/phones/index.html',
            controller:'defaultController'
        }).             
        when('/view/:phoneid',{
            templateUrl:'pages/phones/view.html',
            controller:'viewController'
        }).        
        otherwise({
            redirectTo: '/'
        });        
}]);
