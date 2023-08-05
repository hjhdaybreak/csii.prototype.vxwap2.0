/**
 *我的理财产品
 */
ibsapp.register.controller("MyBankProductCtrl", ['$scope', '$remote', '$stateParams', '$locale',
  function($scope, $remote, $stateParams, $locale) {
    $scope.init = function() {
      $scope.lcFlag = "hold";


      //风险等级
      $scope.ProductRisk = {
        "1": "极低",
        "2": "低",
        "3": "较低",
        "4": "中等",
        "5": "高"
      }

      $remote.post("ProfolioAmountQry.do", {}, function(data) {

        $scope.MktBalAmount = data.MktBalAmount; //持有金额
        $scope.ProfitAmount = data.ProfitAmount; //累计收益

      });

      $remote.post("EAcctBalQry.do", {}, function(data) {
        $scope.AcNo = data.EAcct;

        $remote.post("ProfolioMktBalQry.do", {
          idNo: $scope.AcNo
        }, function(data2) {
          $scope.List1 = data2.List;
        });
        $remote.post("ProfolioCommissionQry.do", {}, function(data2) {
          $scope.List2 = data2.List;
        });
        $remote.post("ProfolioTransQry.do", {
          "TrsType": "150"
        }, function(data3) {
          $scope.List3 = data3.List;
        });
      });

    };

    //切换样式，发请求
    $scope.changeType = function(type) {
      $scope.lcFlag = type;
    }

    //银行理财撤单
    $scope.gotoConfirm = function(row) {
      $scope.$context.setNextScope({
        CommissionCanList: row
      }, "BankProductCancel");
      $scope.goto("appOther.BankProductCancel");
    }

    //追加购买
    $scope.gotoBuy = function(value) {
      $scope.List={
        ProductCode:value
      }
      sessionStorage.setItem("BankProductBuy", vx.toJson($scope.List));
      $scope.goto("appOther.HNLCAppendBuy");
    }
    // 跳到收益明细
    $scope.goIncomeStatement = function() {
      $scope.$context.setNextScope({
        'allIncome': $scope.ProfitAmount
      }, "IncomeStatement");
      $scope.goto("appOther.IncomeStatement", {
        'type': 'YHLC',
        'income': $scope.ProfitAmount
      });
    }
  }
]);