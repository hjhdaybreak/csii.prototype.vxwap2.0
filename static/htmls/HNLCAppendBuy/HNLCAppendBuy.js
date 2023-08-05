/**
 *行内理财 - 产品追加购买
 */
ibsapp.register.controller("HNLCAppendBuyCtrl", ['$scope', '$remote', '$stateParams', '$rootScope',
    function($scope, $remote, $stateParams, $rootScope) {
        $scope.$watch(function() {
            return $rootScope.shiMingTanKuang;
        }, function(newValue, oldValue) {
            if (newValue) {
                $scope.getShiMing();
                // $scope.PerAppendApplyPrice = JSON.parse(sessionStorage.getItem("BankProductBuy")).PerAppendApplyPrice;
                $scope.ProductCode=JSON.parse(sessionStorage.getItem("BankProductBuy")).ProductCode;
                $scope.checkpic = "images/checked01.png";
                var ProductCode = {
                    "ProductId": $scope.ProductCode
                };
                $remote.post("ProfolioProductInfoQry.do", ProductCode, function(data2) {
                    var List = data2.List[0];
                    $scope.ProductCode = List.ProductCode;
                    $scope.ProductFoundDate = List.ProductFoundDate;
                    $scope.ProductExpireDate = List.ProductExpireDate;
                    $scope.Yield = List.Yield;
                    $scope.YieldMin = List.YieldMin;
                    $scope.YieldBig = List.YieldBig;
                    $scope.ProductName = List.ProductName;
                    $scope.PerAppendApplyPrice = List.PerAppendApplyPrice;
                    $scope.ProductDay = List.ProductDay;
                });
                 var ProductCode2 = {
                    "ProductCode": $scope.ProductCode
                };
                //行内理财持有查询
                $remote.post("ProfolioCommissionQry.do", ProductCode2, function(data) {

                    $scope.TotalAmount = data.TotalAmount;
                });
                //余额查询
                $remote.post("EAcctBalQry.do", {}, function(data) {
                    $scope.AvailBal = data.AvailBal;
                });
            }
        });
        $scope.init = function() {
            $scope.getShiMing();
            var showShiMingFlag = sessionStorage.getItem("showShiMingFlag");
            if (showShiMingFlag == "false") {
                // $scope.PerAppendApplyPrice = JSON.parse(sessionStorage.getItem("BankProductBuy")).PerAppendApplyPrice;
                $scope.ProductCode=JSON.parse(sessionStorage.getItem("BankProductBuy")).ProductCode;
                $scope.checkpic = "images/checked01.png";
                var ProductCode = {
                    "ProductId": $scope.ProductCode
                };
                $remote.post("ProfolioProductInfoQry.do", ProductCode, function(data2) {
                    var List = data2.List[0];
                    $scope.ProductCode = List.ProductCode;
                    $scope.ProductFoundDate = List.ProductFoundDate;
                    $scope.ProductExpireDate = List.ProductExpireDate;
                    $scope.Yield = List.Yield;
                    $scope.YieldMin = List.YieldMin;
                    $scope.YieldBig = List.YieldBig;
                    $scope.ProductName = List.ProductName;
                    $scope.PerAppendApplyPrice = List.PerAppendApplyPrice;
                    $scope.ProductDay = List.ProductDay;
                });
                var ProductCode2 = {
                    "ProductCode": $scope.ProductCode
                };
                //行内理财持有查询
                $remote.post("ProfolioCommissionQry.do", ProductCode2, function(data) {
                    $scope.TotalAmount = data.TotalAmount;
                });
                //余额查询
                $remote.post("EAcctBalQry.do", {}, function(data) {
                    $scope.AvailBal = data.AvailBal;
                });
            } else {
                $scope.showShiMing();
            }

        };
        //收益试算
        $scope.YieldPriceClick = function() {
            var TrsAmount = $scope.TrAmounts;
            var BuyProductDay = $scope.ProductDay;
            if (typeof(TrsAmount) == "undefined" || typeof(TrsAmount) == "" || TrsAmount == "null" || TrsAmount == "") {

                TrsAmount = "0";
                $scope.YieldPrice = "0";
            } else {
                var BuyYieldMin = $scope.BuyYieldMin;
                var formData = {
                    "CifType": '3',
                    "ProductId": $scope.ProductCode,
                    "TrsAmount": $scope.TrsAmount
                };
                $remote.post("IncomeQuery.do", formData, function(data) {
                    $scope.YieldPrice = data.ProfitAmt;
                });
            }
            var YieldPrice = TrsAmount * BuyYieldMin / 100 * BuyProductDay / 365;
            $scope.YieldPrice = YieldPrice;
        };
        //确认页面返回追加购买录入页
        $scope.goBack = function() {
            //确认也追加购买成功后修改信息
            $scope.holdAmt += $scope.amount;
            $scope.amount = "";
            $scope.goto("#1");


        };
        $scope.openAgreement = function(row) {
            var item = {
                "textType": row,
                "ProductCode": $scope.ProductCode
            };
            $scope.$context.setNextScope(item, "HNLCXieyi");
            $scope.goto("appOther.HNLCXieyi");
        };
        //追加购买
        $scope.appendBuy = function() {
            //确认也追加购买成功后修改信息
            window.location.reload();
            $("#doNotClickMask").hide();
            $scope.searchAvailBal();
        };
        //全部购买
        $scope.buyAll = function() {
            $scope.TrsAmount = $scope.AvailBal;
            $scope.buyAllFlag = 1;
        };
        $scope.cancel = function() {
            $scope.TrsAmount = '';
            $scope.buyAllFlag = 0;
        };
        //查询可用余额
        $scope.searchAvailBal = function() {
            $remote.post("EAcctBalQry.do", {}, function(data) {
                $scope.availBalValue = data.AvailBal;
            });
        };
        $scope.confirm = function() {
            var TrsAmount = $scope.TrsAmount;
            var AvailBal = $scope.AvailBal;
            //var remainPrice = $scope.value.RemainPrice;
            var remainPrice = $scope.RemainPrice;
            if (1 * TrsAmount > 1 * remainPrice) {
                $scope.AlertErr("超出理财产品剩余购买额度!");
                return;
            }
            if (TrsAmount == null) {
                $scope.AlertErr("起购金额不能为空");
                return;
            }
            if (TrsAmount <= 0) {
                $scope.AlertErr("起购金额应该大于0");
                return;
            }
            if (AvailBal == null) {
                $scope.AlertErr("通讯错误,请稍后再试!");
                return;
            }
            if (TrsAmount > AvailBal) {
                $scope.AlertErr("可用余额不足！请进行资金转入！");
                return;
            }
            if ($scope.checkpic != "images/checked02.png") {
                //NativeCall.alert("请您勾选添利宝基金协议!");
                $scope.AlertErr("请您勾选理财产品协议书!");
                return;
            }
            $scope.alertPwdDiv();
        }
        //获取产品信息
        $scope.getProductInfo = function() {
            $scope.pName = $scope.getValueFromList.FundName; //基金简称
            $scope.holdAmt = $scope.getValueFromList.Cost; //已经购买金额
            var formdataB = {
                "FundType": $scope.getValueFromList.FundType,
                "ProdId": $scope.getValueFromList.ProdId,
                "ProdSubId": $scope.getValueFromList.ProdSubId,
                "FundCode": $scope.getValueFromList.FundCode
            };
            // 购买初始化交易
            $remote.post("FundSubscribePre.do", formdataB, function(data) {
                $scope.pMinAmt = data.PMinAmt; //起购金额
                $scope.pMaxAmt = data.PMaxAmt; //最大购买金额
                $scope.FundIsSign = data.FundIsSign;
            });
        };

        //复选框状态切换
        $scope.doCheck = function() {
            if ($scope.checkpic == "images/checked01.png") {
                $scope.checkpic = "images/checked02.png";
                return;
            }
            $scope.checkpic = "images/checked01.png";
        };
        $scope.submitBuy = function() {

            if ($("#pwdCommon").val().length > 5) {
                $remote.post("GenToken.do", {}, function(data) {
                    $scope._tokenName = data;
                    var params = {
                        "_tokenName": $scope._tokenName,
                        "TrsPassword": $scope.uuid = $scope.getPwd(),
                        "TrsAmount": $scope.TrsAmount,
                        "ProductId": $scope.ProductCode
                    };
                    $remote.post("ProfolioSubscribeTrs.do", params, function(data) {
                        $scope.result = data;
                        $scope.goto("#2");
                    });
                });
            } else {
                $scope.AlertErr("交易密码格式错误");
            }


        }
    }
]);