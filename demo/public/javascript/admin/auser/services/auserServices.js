var auserService = angular.module('auserService',['ngResource']);

auserService.factory('Ausers',['$resource',function($resource){
    return $resource('user/rest/:auserid',{':auserid':'@id'},{
        login:{
            method:'POST',
            parram:{user:'',password:''},
            isArray:false,
            url:'user/rest/login'
        }
    });
}]);