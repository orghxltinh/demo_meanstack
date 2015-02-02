require.config({
    baseUrl: "/javascript/main",    
    paths: {
        'jquery': '../../vendor/jquery/dist/jquery.min',
        'angular': '../../vendor/angular/angular.min',
        'angular-route': '../../vendor/angular-route/angular-route.min',
        'angular-resource': '../../vendor/angular-resource/angular-resource.min',
        'global':'../global/global',
        'phonesModule': 'modules/phonesModule',
        'phonesCtrl': 'controllers/phonesController',
        'phoneServices':'services/phonesServices'        
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
        'phoneServices': ['angular','angular-resource','angular-route','global'], 
        'phonesModule': ['angular','angular-resource','angular-route','global'],
        'phonesCtrl':['angular','angular-resource','angular-route','global'], 
        'global':['jquery']
    }
});

require(['global','phoneServices','phonesCtrl','phonesModule'],function(){
    var mainApp = document.getElementById('mainApp');
    angular.element(mainApp).ready(function() {
        angular.bootstrap(mainApp, ['phoneModule']);
    });
});