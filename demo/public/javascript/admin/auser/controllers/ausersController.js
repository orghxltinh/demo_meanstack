var ausersController = angular.module('ausersController',['ausersDirective']);

ausersController.controller('listController',['$scope',function($scope){
        
}]);

ausersController.controller('createController',['$scope','Ausers',function($scope,Ausers){
    $scope.submitAction = function(){
        var auser = new Ausers();
        auser.user = $scope.user;
        auser.password = $scope.password;
        auser.$save(function(res,header){
            console.log(res);
            console.log(header);
        });
    };
}]);

ausersController.controller('loginController',['$scope','Ausers',function($scope,Ausers){        
    $scope.submitAction = function(){
        Ausers.login({user:$scope.user,password:$scope.password},function(res,header){            
            if(res.success == 'success'){
                window.location.href = '/admin';
                console.log('redirect');
            }                
        });        
    };     
}]);

/*
ausersController.directive('loginApp',function(){
    return {
        transclude: 'element',
        restrict:'AE',
        replace: true,
        templateUrl:'/pages/ausers/_login.html',        
        link: function(scope,ele,attrs){            
        }
    };
});
*/