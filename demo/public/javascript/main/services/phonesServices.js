var phonesServices = angular.module('phonesServices',['ngResource']);

phonesServices.factory('Phones',['$resource',function($resource){
        return $resource('_phones/rest/:phoneid',{':phoneid':'@id'},{});
}]);