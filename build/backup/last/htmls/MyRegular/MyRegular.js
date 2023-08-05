/**
 * 我的定期产品
 */
ibsapp.register.controller("MyRegularCtrl", ['$scope', '$remote',
  function($scope, $remote) {
    $scope.init = function () {
      $remote.post("FundHoldShareQry.do", {}, function (data) {
        $scope.fundHoldShareQry = data;
        var list = data.ShareList;
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          if (item.FundType == 'B') {
            item.EffectDate = item.EffectDate.replace(/\-/g, ".");
            item.ExpireDate = item.ExpireDate.replace(/\-/g, ".");
          }
        }
        $scope.shareList = list;
      });
    };
    $scope.openBox = function(item) {
      $scope.questionflag = true;
    }
    $scope.closeBox = function(){
      $scope.questionflag = false;
    };
    $scope.gotoYYY = function(item) {
      sessionStorage.setItem("myYYY", vx.toJson('YYYlist'));
      $scope.goto('appOther.MyYYY')
    }
    // 跳转我的招商招益
    $scope.gotoMyZSZY = function(item) {
      if (!item) return;
      var zszyInfo = {
        "ProdId": item.ProdId,
        "ProdSubId": item.ProdSubId,
        "FundCode": item.FundCode,
      };
      /*$scope.$context.setNextScope({
         "zszyInfo":zszyInfo
      },"MyZSZY");*/
      sessionStorage.setItem("myZSZYInfo", vx.toJson(zszyInfo));
      sessionStorage.setItem("myZSZY", vx.toJson('ZSZYlist'));
      $scope.goto("appOther.MyZSZY");
    };
  }
]);