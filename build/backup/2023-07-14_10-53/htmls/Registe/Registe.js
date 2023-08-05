/**
 *注册
 */
ibsapp.register.controller("RegisteCtrl", ['$scope', '$remote', '$targets', '$timeout', '$rootScope',
    function($scope, $remote, $targets, $timeout, $rootScope) {
        $scope.init = function() {
            //$scope.changeYZM();//
            $scope.agreement = false;
            //勾选协议标志
            $scope.showLoginPwd = true;
            //
            $scope.changeYZM();
        };
        $scope.authInit = function() {
            //$scope.positiveImg = $takePhoto("positiveImg", "positiveImgBox", '1');
            //$scope.oppositeImg = $takePhoto("oppositeImg", "oppositeImgBox", '1');
            //$scope.handImg = $takePhoto("handImg", "handImgBox", '1');
        };
        $scope.sendMsg = function() {
            $scope.verificateCode = '';
            var MobilePhone_reg = /^\d{11}$/;
            if (!$scope.phone || MobilePhone_reg.test($scope.phone) == false) {
                $scope.AlertErr("手机号格式不正确");
                return false;
            }
            var securitycode_reg = /^\d{4}$/;
            if (securitycode_reg.test($scope.gTokenImg) == false) {
                $scope.AlertErr("附加码格式不正确");
                return false;
            }
            var params = {
                "TokenMessage": "sms.RegisterPre.P",
                "TokenIndex": "1",
                "MobilePhone": $scope.phone,
                "ExistCheckFlag": true,
                "_vTokenName": $scope.gTokenImg

            };
            $remote.post("GenPhoneTokenForPublicForNJ.do", params, function(data) {
                $scope.securityCodeContent = data.Content;

                if (data.jsonError) {
                    $scope.AlertErr(data.jsonError[0]._exceptionMessage);
                }
            }, function(data) {
                $scope.changeYZM();
            });
            //$scope.changeYZM();
        };
        $scope.changeYZM = function() {
            var rand = Math.random();
            $scope.GenTokenImg = "/portal/GenTokenImg.do?rand=" + rand;
        };
        $scope.doNext = function() { //录入下一步
            var params = {
                "MobilePhone": $scope.phone,
                "_pTokenName": $scope.verificateCode,
                "_vTokenName": $scope.gTokenImg,
                "ReferrNo": $scope.recommend,
                "BankId": "9999"
            };
            $remote.post("JCRegisterInfo.do", params, function(data) {
                $scope.authData = data;
                $scope.goto("#2");
            }, function(dataerror) {
                $scope.securityCodeContent = '';
                $scope.verificateCode = '';
            });
        };

        $scope.doAgree = function() { //勾选协议
            $scope.agreement = !$scope.agreement;
        };
        $scope.netVerif = function() { //身份认证

            var params = {
                "IdNo": $scope.idCard,
                "CifName": $scope.name,
                "IdentityFront": '',
                "IdentityBack": '',
                "Photo": ''
            };
            $remote.post("JCRegisterOnline.do", params, function(data) {
                $scope.netVerifData = data;
                $scope.cjStatus = data.Status;
                //产金客户标识
                if ($scope.cjStatus == "Y") { //产金客户
                    $scope.goto("#3");
                    //跳转密码设置页
                } else {
                    $scope.goto("#4");
                    //绑卡
                }
            });
        };
        //甚至密码页返回
        $scope.goLastPage = function() {
            if ($scope.cjStatus == "Y") { //产金
                $scope.goto("#2");
            } else {
                $scope.goto("#4");
            }
        }
        $scope.checkBank = function($event) { //获取银行卡信息
            if (!$event.target.value) {
                $scope.AlertErr("银行卡不能为空");
                return;
            }
            if (!$event.target.value.match(/^\d{19}$/)) {
                $scope.AlertErr("银行卡格式不符合要求");
                return;
            }
            var params = {
                "AccountNo": $scope.cardNo,
                "BankId": "9999"
            };
            $remote.post("queryBankInfo.do", params, function(success, message) {
                if (success) {
                    var data = success.split(',');
                    $scope.bankName = data[0];
                    $scope.InnerFlag = data[2];
                    $scope.bankId = data[1];
                } else {
                    $scope.AlertErr(message);
                }
            });
        };
        $scope.cardBind = function() { //绑定银行卡
            var params = {
                "AcNo": $scope.cardNo,
                "CifName": $scope.name,
                "IdNo": $scope.idCard,
                "CardMobilePhone": $scope.phone,
                "PayeeBankId": $scope.bankId,
                "PayeeBankName": $scope.bankName,
                "BankInner": $scope.bankId
            };
            $remote.post("JCRegisterBoundCard.do", params, function(data) {
                $scope.goto("#3");
            });
        };
        $scope.showTrsPwd = function() { //设置密码
            var params = {
                "Password": "",
                "ConfirmPassword": ""
            };
            $remote.post("JCRegisterLoginPwd.do", params, function(data) {
                $scope.showLoginPwd = false;
            });
        }
        $scope.doIt = function() { //设置交易密码
            var params = {
                "Password": "",
                "ConfirmPassword":"",
                "EAccountTrsPwd": "", //
                "EAccountTrsPwdConfirm": ""
            };
            $remote.post("JCRegisterTrsPwd.do", params, function(data) {
                $scope.setPwdDate = data;
                $scope.IsSchedule = data.IsSchedule ? data.IsSchedule : null;
                //预约开户标志
                $scope.Status = data.Status;
                //产金客户标识
                $scope.goto("#5");
            });

        };
        //去看服务协议
        $scope.scanServiceProtocolFn = function() {
            $scope.goto("#6");
        };
        //登录
        $scope.goLogin = function() {
                $scope.goto('app.Main');
                $scope.showLogin();
            }
            //我的账户
        $scope.goMy = function() {
            $rootScope.beforeLoginRoute = "app.My";
            $scope.showLogin();
        }
    }
]);
