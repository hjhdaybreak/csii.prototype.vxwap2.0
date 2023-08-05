welcomeCtrl.$inject = ["$scope", "$remote", "$location", "$rootScope", "$window", "$timeout"];

function welcomeCtrl($scope, $remote, $location, $rootScope, $window, $timeout) {
    $scope.startupIndex = function() {
        $scope.clientWidth = document.body.clientWidth * 0.86 + "px";

        if (localStorage.getItem("userNo") && localStorage.getItem("userNo") != "undefined") { //读取本地存储 账户号
            $scope.userNo = localStorage.getItem("userNo");
            $scope.remoberUserF = true;
            //记住密码标志
        } else {
            $scope.remoberUserF = false;
            //记住密码标志
        }
        if (sessionStorage.getItem("loginInfo") && sessionStorage.getItem("loginInfo") != "undefined" && sessionStorage.getItem("loginInfo") != "[object Object]") { //读取用户信息本地存储
            $rootScope.loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
        } else {
            $rootScope.loginInfo = {};
            //记住密码标志
        }
        if (sessionStorage.getItem("userInfo")) { //头像
            var userHeadInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            if (userHeadInfo && userHeadInfo.nickName) {
                $scope.nickName = userHeadInfo.nickName;
            }
            if (userHeadInfo && userHeadInfo.idImg) {
                $scope.IdImgBase = userHeadInfo.idImg ? 'data:image/*;base64,' + userHeadInfo.idImg : '../images/touxiang.png';
            }

        }
        $scope.VerCodeFlag = "0";
        //$scope.getLoginF();

        var aa = $scope.IdImgBase;
        if ($scope.getLoginF() && !$scope.IdImgBase) {
            $scope.getNickName();
            $scope.getShiMing();
        }
    };
    $scope.remoberUser = function() { //记住账户
        $scope.remoberUserF = !$scope.remoberUserF;
        if ($scope.remoberUserF) {
            localStorage.setItem("userNo", $scope.userNo);
        } else {
            localStorage.removeItem("userNo");
        }
    };
    $scope.goRegiste = function() { //去注册
        $scope.closeSlideBar();
        $scope.goto("appOther.Registe");
    };
    $scope.doLogin = function() { //登录
        if (!$scope.userNo) {
            $scope.AlertErr("用户名格式不正确");
            return;
        }
        if ($scope.VerCodeFlag == 1) {

            var reg = /^\d{4}$/;
            if (!$scope.yzm) {
                $rootScope.AlertErr("验证码不能为空");
                return;
            } else if (!$scope.yzm.match(reg)) {
                $rootScope.AlertErr("格式不符合要求");
                return;
            }
        }
        var params = {
            "VerCodeFlag": $scope.VerCodeFlag, //验证码标志
            "_vTokenName": $scope.yzm, //验证码
            "MenuId": "", //传空
            "Url": "", //  传空
            "Index": "", // 传空
            "LoginId": $scope.userNo, //用户名
            "Password": '', //密码
            //"uuid":,  
            "_ChannelId": "WAP"
        };
        $remote.post("login.do", params, function(data) {
            //登录成功后存住用户名
            if ($scope.remoberUserF) {
                localStorage.setItem("userNo", $scope.userNo);
            }
            //登录次数确保数字化
            data.DayLoginTimes = Number(data.DayLoginTimes);
            //5分钟后弹出引导下载app弹框
            $scope.VerCodeFlag = "0";
            $("#yzm").hide();
            $scope.closeSlideBar();
            //$rootScope.loginInfo.loginFlag = true;
            /*
             * safari浏览器处于无痕模式下，会清除sessionStorage的存储数据
             */
            try {
                sessionStorage.setItem("loginedF", true);
                sessionStorage.setItem("loginInfo", JSON.stringify(data));
                $rootScope.loginInfo = data;
                $rootScope.loginedF = true;
                if ($scope.beforeLoginRoute) { //跳到登录前点的菜单

                    if ($scope.beforeLoginRouteParam) {
                        $scope.goto($scope.beforeLoginRoute, $scope.beforeLoginRouteParam);
                        //跳过去再location.reload
                        $rootScope.$on('$stateChangeEnd', function(event, toState, toStateParams) {
                            $window.location.reload();
                        });
                    } else {
                        $scope.goto($scope.beforeLoginRoute);
                        //跳过去再location.reload
                        $rootScope.$on('$stateChangeEnd', function(event, toState, toStateParams) {
                            $window.location.reload();
                        });
                    }
                } else {
                    $window.location.reload();
                }
            } catch (e) {
                alert("您处于无痕浏览，无法为您跳转");
            }
        }, function(data) {

            $("#yzm").show();
            $scope.VerCodeFlag = "1";
            $scope.getYZImg();
            //$rootScope.loginInfo.loginFlag = false;
            $rootScope.loginedF = false;
            sessionStorage.setItem("loginedF", false);
            sessionStorage.removeItem("loginInfo");
            sessionStorage.removeItem("userInfo");
            // if (data.jsonError) {
            // $scope.AlertErr(data.jsonError[0]._exceptionMessage);
            // }
            //登录失败后用户信息密码删除
            $("#loginPwd").val("");
            $("#loginPwd").attr("sf_uuid", "");
        });
    };
    //获取头像和昵称
    $scope.getNickName = function() {
        $remote.post("QueryHeadImg.do", {}, function(data) {
            $scope.nickName = data.NickName;
            $scope.IdImgBase = data.IdImgBase ? 'data:image/*;base64,' + data.IdImgBase : '../images/touxiang.png';
            sessionStorage.setItem("userInfo", JSON.stringify({
                "nickName": data.NickName,
                "idImg": data.IdImgBase
            }));
        });
    };

    $scope.getYZImg = function() { //验证码

        var rand = Math.random();
        $scope.GenTokenImg = "/portal/GenTokenImg.do?rand=" + rand;
        //$("#yzmImg").attr("src",$scope.GenTokenImg);
    };
    $scope.loginOut = function() { //退出

        $remote.post("logout.do", {}, function(data) {
            //退出登录密码删除
            $("#loginPwd").val("");
            $("#loginPwd").attr("sf_uuid", "");
            $rootScope.loginedF = false;
            sessionStorage.setItem("loginedF", false);
            sessionStorage.removeItem("loginInfo");
            $scope.closeSlideBar();
            if (sessionStorage.getItem("paramSB")) {
                $scope.goto("appOther.ThirdPartyMain");
            } else {
                $scope.goto("app.Main");
            }
            //退出跳到主页
        });
    };
    $scope.$watch(function() {
        sessionStorage.getItem("loginedF");
    }, function(newValue, oldValue) {
        if (sessionStorage.getItem("loginedF") == true) {
            $scope.fiveMAlert();
        }
    });
    //5分钟后弹出引导下载app的页面
    $scope.fiveMAlert = function() {
        //5分钟后弹出下载app引导下载弹框
        if (!sessionStorage.getItem("fiveMinuteSholed")) { //一个会话只显示一次
            $timeout(function() {
                $("#fiveMinute").show();
            }, 5 * 60 * 1000); //
        }
    };
}
