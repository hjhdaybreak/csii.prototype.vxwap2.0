/**
 *生活
 */
ibsapp.register.controller('LifeCtrl',["$state", "$stateParams", '$scope', '$remote', '$rootScope',function ($state, $stateParams, $scope, $remote, $rootScope) {

    $scope.init = function() {
        //登录前路由清零
        $rootScope.beforeLoginRoute = '';
        $scope.changeSHash();
        //$("#title").html("sss");
        //删除生活缴费缴费信息
        if (sessionStorage.getItem("PayCityString")) {
            sessionStorage.removeItem("PayCityString");
        }
        if (sessionStorage.getItem("busitypeString")) {
            sessionStorage.removeItem("busitypeString");
        }
        //删除贷款部分信息存储
        if (sessionStorage.getItem("RepayDataString")) {
            sessionStorage.removeItem("RepayDataString");
        }
        if (sessionStorage.getItem("EcacctAvailBalString")) {
            sessionStorage.removeItem("EcacctAvailBalString");
        }
        if (sessionStorage.getItem("PlanDateString")) {
            sessionStorage.removeItem("PlanDateString");
        }
    };
    //进入不同交易页
    $scope.TurnTo = function(router) {
        if (sessionStorage.getItem("loginedF") == 'true') {
            $scope.goto(router);
        } else {
            //打开侧滑栏登录
            $rootScope.beforeLoginRoute = router;
            $scope.showLogin();
        }
    };
    //手机充值
    $scope.goPhoneRechargeFn = function() {
        if (sessionStorage.getItem("loginedF") == "true") {
            sessionStorage.setItem("prePhoneRechargePageUrl", "app.Life");
            $scope.goto("appOther.PhoneRecharge");
        } else {
            sessionStorage.setItem("prePhoneRechargePageUrl", "app.Life");
            //打开侧滑栏登录
            $rootScope.beforeLoginRoute = "appOther.PhoneRecharge";
            $scope.showLogin();
        }
    };
    //加油卡
    $scope.goGasCardChargeFn = function() {
        if (sessionStorage.getItem("loginedF") == "true") {
            sessionStorage.setItem("preGasCardChargePageUrl", "app.Life");
            $scope.goto("appOther.GasCardCharge");
        } else {
            sessionStorage.setItem("preGasCardChargePageUrl", "app.Life");
            //打开侧滑栏登录
            $rootScope.beforeLoginRoute = "appOther.GasCardCharge";
            $scope.showLogin();
        }
    };
    //推荐好友
    $scope.goRecommandFn = function() {

        if (sessionStorage.getItem("loginedF") == 'true') {
            var cifName = $scope.loginInfo.CifName;
            var userSeq = $scope.loginInfo.UserSeq;
            $scope.goto('appOther.RecommendFriend', {
                "name": cifName,
                "seq": userSeq
            });
        } else {
            //打开侧滑栏登录
            $scope.showLogin();
        }
    };
}]) ;

