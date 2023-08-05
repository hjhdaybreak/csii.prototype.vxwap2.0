ibsapp.register.controller("ActiveMainCtrl", ['$scope','$rootScope','$os', function($scope,$rootScope,$os) {
    $scope.init = function() {
         $scope.isIos=$os.ios ? true:false;
    }
    $scope.TurnTo = function(router) {
        if (sessionStorage.getItem("loginedF") == "true") {
            $scope.goto(router);
        } else {
            //打开侧滑栏登录
            $rootScope.beforeLoginRoute = router;
            $scope.showLogin();
        }
    }
}]);
