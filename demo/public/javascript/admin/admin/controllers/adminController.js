
var adminController = angular.module('adminController',[]);

adminController.controller('homeController',['$scope',function($scope){
        
}]);

adminController.controller('listController',['$scope','Phones',function($scope,Phones){
        
        console.log('phones list');
        
             
        Phones.getAll(function(res,header){
            global.checkAuth(res,function(){
                if(res.success == 1){
                    $scope.datas = res.data;
                    console.log($scope.datas);
                }
                else alert(res.message);
            });
        });
        
        $scope.main_board = true;
        $scope.deleteClick = function(phone,event){
            var aphone = new Phones();
            console.log(phone);
            
            var yn = confirm("Are you sure?");
            if(yn == true){
                Phones.delete({_id:phone._id},function(res,header){
                    
                    global.checkAuth(res,function(){
                        if(res.success == 1) alert(res.message);
                    });
                });
            }
            event.preventDefault();
        };
        
        $scope.updateClick = function(phone,event){            
            $scope.udId = phone._id;
            $scope.udName = phone.name;
            $scope.udPrice = phone.price;
            $scope.udImage = phone.image;
            $scope.udQuantity = phone.quantity;
            $scope.main_board = false;
            $scope.update_board = true;            
            event.preventDefault();            
        };
        
        $scope.updatePhone = function(){
            Phones.update({
                _id: $scope.udId,
                name: $scope.udName,
                price: $scope.udPrice,
                image: $scope.udImage,
                quantity: $scope.udQuantity
            },function(res,header){
                global.checkAuth(res,function(){
                    if(res.success == 1){
                        var data = res.data;
                        $.each($scope.datas,function(index,value){
                            if(value._id == data._id){
                                $scope.datas[index] = data;
                                return false;
                            }
                        });
                        $scope.main_board = true;
                        $scope.update_board = false;          
                    }else alert(res.message);
                });                
            });
        };
        
       
}]);

adminController.controller('createController',['$scope','Phones',function($scope,Phones){
        $scope.submitAction = function(){
            var form = document.getElementById('phoneForm');
            var uploadForm = new FormData(form);
            var client = new XMLHttpRequest();
            
            
            client.onreadystatechange = function(){
                if (client.readyState == 4 && client.status == 200){                    
                    var res = JSON.parse(client.responseText);
                    console.log('responseText:',res);
                    if(res.success === 1)   location.reload();
                }
            };            
            
            client.open('POST','/admin/_phones/rest');
            client.send(uploadForm);
             
            
            //Phones.createWithImage(uploadForm);
            //var phone = new Phones();
            /*
            phone.name = $scope.name;
            phone.price = $scope.price;
            
            
            phone.image = uploadForm;
            phone.quantity = $scope.quantity;
            phone.$save(function(res,header){
                global.checkAuth(res,function(){
                    if(res.success == 1){
                        window.location.href = '/admin#/phones';
                    }else alert(res.message);
                });
            });
            */
        };
}]);

