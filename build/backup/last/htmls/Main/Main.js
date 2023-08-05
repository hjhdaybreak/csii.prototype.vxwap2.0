/**
 *主页
 */
ibsapp.register.controller('MainCtrl', ['$os', "$state", "$stateParams", '$scope', '$remote', '$timeout', '$locale', '$rootScope', function($os, $state, $stateParams, $scope, $remote, $timeout, $locale, $rootScope) {
    $($timeout(function() {//轮播图
        var swiper = new Swiper('.swiper-container', {
            pagination : '.swiper-pagination',
            paginationClickable : true,
            nextButton : '.swiper-button-next',
            prevButton : '.swiper-button-prev',
            spaceBetween : 30,
            autoplay:5000,
            loop : true
        });
    }, 50));
    $scope.init = function() {
        //登录前路由清零
        $rootScope.beforeLoginRoute = '';
        //ios 设置快捷方式弹框
        //$scope.iosSetQuickF = navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) && !$scope.isWeCat() ? true : false;
        if ($os.ios && !$scope.isWeCat()) {
            if (!sessionStorage.getItem("iosSetQuickFlag")) {
                $scope.iosSetQuickF = true;
            } else {
                $scope.iosSetQuickF = false;
            }
        }
        $scope.changeSHash();
        $scope.cardTypeList = [{ //卡类型
            "key": "0"
        }, {
            "key": "1"
        }, {
            "key": "2"
        }, {
            "key": "3"
        }];
        $scope.getSelectProduct();
        $scope.getLoginF();
        //生活主页面删除生活缴费缴费信息
        if (sessionStorage.getItem("PayCityString")) {
            sessionStorage.removeItem("PayCityString");
        }
        if (sessionStorage.getItem("busitypeString")) {
            sessionStorage.removeItem("busitypeString");
        }
    };
    //苹果手机引导设置主屏幕
    $scope.hideSetQuick = function() {
        $scope.iosSetQuickF = false;
        sessionStorage.setItem("iosSetQuickFlag", true);
    }
    $scope.getSelectProduct = function() { //精选产品
        $remote.post("queryOptProductList.do", {}, function(data) {
            $scope.list = data.List;
        });
    };
    //去产品详情页
    $scope.gotoProduct = function(row) {
        if (row.Status != 1) {
            return;
        }
        switch (row.Fund_oname) {
            case "ZS":
                sessionStorage.setItem("ZSZYdetail", vx.toJson('main'));
                //招商招益
                var zszyInfo = {
                    "ProdId": '0002',
                    "ProdSubId": '002001',
                    "FundCode": row.Fund_Code,
                    "FundName": row.Fund_Name
                };
                sessionStorage.setItem("zszyInfoData", vx.toJson(zszyInfo));
                $scope.goto("appOther.ZSZYDetail");
                $scope.goto("appOther.ZSZYDetail");
                //招商招益
                break;
            case "YYY":
                //sessionStorage.setItem("YYYdetail", vx.toJson('main'));
                //$scope.goto("appOther.YYY_Query");
                //月月盈
                break;
            case "TLB":
                //sessionStorage.setItem("preTLB_ProductSearchPageUrl", 'app.Main');
                //$scope.goto("appOther.TLB_ProductSearch");
                //添利宝
                break;
            case "WZC":
                //$scope.goto("appOther.SmartDeposit");
                //微智存
                break;
            case "HNLC":
                if (row.Status == 1 && row.Fund_oname == 'HNLC') {
                    params = {
                        "row": row
                    };
                    params.flag = "main";
                    sessionStorage.setItem("BankProductObjString", vx.toJson(params));
                    $scope.goto("appOther.BankProductQueryDetail");
                    //行内理财
                }
                break;
            default:
                $scope.goto("app.Wealth");
        }
    };
    //手机充值
    $scope.goPhoneRechargeFn = function() {
        if (sessionStorage.getItem("loginedF") == "true") {
            sessionStorage.setItem("prePhoneRechargePageUrl", "app.Main");
            $scope.goto("appOther.PhoneRecharge");
        } else {
            sessionStorage.setItem("prePhoneRechargePageUrl", "app.Main");
            //打开侧滑栏登录
            $rootScope.beforeLoginRoute = "appOther.PhoneRecharge";
            $scope.showLogin();
        }
    };
    //加油卡
    $scope.goGasCardChargeFn = function() {
        if (sessionStorage.getItem("loginedF") == "true") {
            sessionStorage.setItem("preGasCardChargePageUrl", "app.Main");
            $scope.goto("appOther.GasCardCharge");
        } else {
            sessionStorage.setItem("preGasCardChargePageUrl", "app.Main");
            //打开侧滑栏登录
            $rootScope.beforeLoginRoute = "appOther.GasCardCharge";
            $scope.showLogin();
        }
    };
    //进入不同菜单交易页
    $scope.TurnTo = function(router) {
        if (sessionStorage.getItem("loginedF") == "true") {
            $scope.goto(router);
        } else {
            //打开侧滑栏登录
            $rootScope.beforeLoginRoute = router;
            $scope.showLogin();
        }
    };
}]);
