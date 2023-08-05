ibsapp.register.controller("DarenQryCtrl", ["$scope", "$remote", "$rootScope", "$scrollPage",
  function ($scope, $remote, $rootScope, $scrollPage) {
    //初始化方法
    $scope.init = function () {
      $remote.post("RecommendDaren.do", {}, function (data) {
        $scope.List = data.List;
      });
    };
    $scope.gotoRecFri=function(){
    	var cifName=$scope.loginInfo.CifName;
        var userSeq=$scope.loginInfo.UserSeq ;
	    $scope.goto('appOther.RecommendFriend',{"name":cifName,"seq":userSeq});
    }
  }
]);
