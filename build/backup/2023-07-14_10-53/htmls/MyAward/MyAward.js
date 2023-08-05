/**
 *我的奖品
 */
ibsapp.register.controller("MyAwardCtrl", ['$scope', '$remote', '$timeout',
    function($scope, $remote, $timeout) {
        $scope.init = function() {
            $scope.closeSlideBar();
            $remote.post("PrizedInfoPc.do",{},function(data){
                $scope.List = data.List;
            });
        };
        //$scope.doSubmit=function(){
        //
        //    $remote.post("",params,function(data){
        //
        //    });
        //}
    }
]);
