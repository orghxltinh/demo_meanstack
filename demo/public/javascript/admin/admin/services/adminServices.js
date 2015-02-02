
var adminServices = angular.module('adminServices',['ngResource']);

adminServices.factory('Phones',['$resource',function($resource){
                
        return $resource('/admin/_phones/rest/:_id',{'phoneid':'@id'},{
            update:{
                method:'PUT',
                parram:{_id:'@_id',name:'@name',price:'@price',image:'@image',quantity:'@quantity'},
                isArray:false,
            },
            delete:{
                method:'DELETE',
                parram:{_id:'@_id'},
                isArray:false
            },
            getAll:{
                method:'GET',
                url:'/admin/_phones/rest',
                isArray:false
            },
            createWithImage:{
                method:'POST',
                isArray:false
            }
        });        
}]);
