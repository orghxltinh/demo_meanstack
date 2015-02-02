var phonesController = angular.module('phonesController',[]);

phonesController.controller('defaultController',function($scope,Phones){
    var phones = Phones.query();
    $scope.phones = phones;
    console.log(phones);
});
/*
phonesController.controller('createController',['$scope','Phones',function($scope,Phones){
    $scope.submitAction = function(e){
        var phone = new Phones();
        phone.name = $scope.name;
        phone.price = $scope.price;
        phone.image = $scope.image;
        phone.quantity = parseInt($scope.quantity);
        phone.$save(function(res,resHeader){
            console.log('res:',res);
            console.log('resHeader:',resHeader);
        });
    };
}]);
*/

phonesController.controller('viewController',['$scope','Phones','$routeParams',function($scope,Phones,$routeParams){
    console.log($routeParams.phoneid);
    Phones.get({phoneid:$routeParams.phoneid},function(res,resHeader){
      $scope.phone = res.phone;
        console.log('res:',res);
        console.log('resHeader:',resHeader);
    });
        
}]);