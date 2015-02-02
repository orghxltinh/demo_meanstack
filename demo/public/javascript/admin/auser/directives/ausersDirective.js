var ausersDirective = angular.module('ausersDirective',[]);

ausersDirective.directive('loginApp',function(){
    return {
        transclude: 'element',
        restrict:'AE',
        replace: true,
        templateUrl:'/pages/ausers/_login.html',        
        link: function($scope,ele,attrs){     
          var $doc = $(document), w = window.innerHeight;
          ele.ready(function(){
            ele.css({
              top : (w - ele.innerHeight()) / 2,
              opacity : 1
            });
          });
          
          $doc.bind('keypress',function(event){
            if(event.keyCode === 13){
              console.log('event.keyCode:',event.keyCode);
              $scope.submitAction();
            }            
          });
          $scope.$on('$routeChangeStart',function(){
            $doc.unbind('keypress');
            $scope.$off('$routeChangeStart');
          });    
        }
    };
});