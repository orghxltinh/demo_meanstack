var adminModule = angular.module('adminModule',['ngRoute','adminServices','adminController']);

adminModule.config(['$routeProvider',function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'/pages/admin/home.html',
                controller:'homeController'
            })
            .when('/phones',{
                templateUrl:'/pages/admin/phones/list.html',
                controller:'listController'
            })
            .when('/phones/create',{
                templateUrl:'/pages/admin/phones/create.html',
                controller:'createController'
            })
        ;
}]);

adminModule.controller('mainCtrl',function(){
    console.log('alo');
});




