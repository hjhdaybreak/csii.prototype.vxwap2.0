/**
 *定期产品列表查询
 */
ibsapp.register.controller("RegularQryCtrl", ['$scope', '$remote',
  function($scope, $remote) {
    $scope.init = function() {
      $remote.post("FundProdListQry.do", {}, function(data) {
        $scope.itemList = data.ProdList;
      });
    };
    $scope.gotoDetail = function(item) {
      if (item.FundType == 'A') {
        //sessionStorage.setItem("YYYdetail", vx.toJson('list'));
        //$scope.goto('appOther.YYY_Query');
      } else if (item.FundType == 'B') {
        //sessionStorage.setItem("zszyInfoData", vx.toJson(item));
        //$scope.goto('appOther.ZSZYDetail');
      }
    };
    $scope.goBack = function() {
      $scope.goto("app.My");
      $("#doNotClickMask").hide();
    }
  }
]);