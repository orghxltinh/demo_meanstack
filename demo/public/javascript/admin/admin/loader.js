require.config({
    baseUrl: "/javascript",    
    paths: {
        'jquery': '../vendor/jquery/dist/jquery.min',
        'angularAMD':'../vendor/angularAMD/angularAMD',
        'angular': '../vendor/angular/angular.min',
        'angular-route': '../vendor/angular-route/angular-route.min',
        'angular-resource': '../vendor/angular-resource/angular-resource.min',
        'global':'global/global',
        'adminModule': 'admin/admin/modules/adminModule',
        'adminCtrl': 'admin/admin/controllers/adminController',
        'adminServices':'admin/admin/services/adminServices'        
    },
    shim: {  
        "angular": {
            exports: "angular"
        },
        "angular-resource": {
            deps: ["angular"]
        },
        "angular-route": {
            deps: ["angular"]
        },
        'adminServices': ['angular','angular-resource','angular-route','global'], 
        'adminModule': ['angular','angular-resource','angular-route','global'],
        'adminCtrl':['angular','angular-resource','angular-route','global'], 
        'global':['jquery']
    }
});

require(['global','adminServices','adminCtrl','adminModule'],function(){
    var mainApp = document.getElementById('mainApp');
    angular.element(mainApp).ready(function() {
        angular.bootstrap(mainApp, ['adminModule']);
    });
});