ibsapp.register.controller("MyRecommendQryCtrl", ["$scope", "$remote", "$rootScope", "$scrollPage", "$timeout",
    function($scope, $remote, $rootScope, $scrollPage, $timeout) {
        //初始化方法

        $scope.init = function() {
            $scope.dialog = false;
            $scope.recommendType = '1'; // 默认我的推荐
            $scope.regiestType = '0'; // 默认未绑卡
            $scope.recommendTypeMap = {
                "1": "我的推荐",
                "2": "代理人推荐",
                "3": "机构推荐"
                    // "4": "公司推荐"
            };
            $scope.noticeIconF = true; //提示信息icon显示标志
            $scope.Loadingcount = 0;
            $scope.currentIndex = "0";
            $scope.pageSize = '10';
            
            $scope.params = {
                "RecommendType": $scope.recommendType,
                "RegiestType": $scope.regiestType,
                "currentIndex": $scope.currentIndex,
                "pageSize": $scope.pageSize
            };
            $scope.getRecTypes(); //获取推荐类型
            $scope.scroller = $scrollPage.create("transList-all", function(noMoreFn) { //上拉加载函数
                $scope.Loadingcount = $scope.Loadingcount + 1;
                $scope.currentIndex = ($scope.Loadingcount * $scope.pageSize).toString();
                $remote.post("RecommendQry.do", $scope.params, function(data) {
                    $scope.list = $scope.list.concat(data.List);
                    $timeout(function() {
                        $scope.scroller.refresh();
                    }, 200);
                    var endFlag = data.recordNumber < (parseInt($scope.currentIndex) + parseInt($scope.pageSize));
                    noMoreFn(endFlag);
                });
            }, function() { //下拉刷新函数
                $scope.currentIndex = "0";
                $remote.post("RecommendQry.do", $scope.params, function(data) {
                    $scope.list = data.List;
                    $scope.scroller.refresh();
                });
            });
            $scope.query($scope.regiestType);
        };
        $scope.getRecTypes = function() { //获取推荐类型
            $remote.post("RecommendQryPre.do", {}, function(data) {
                $scope.result = data;
            });
        }
        $scope.queryRecommend = function(e,recommendType) { // 设置推荐类型
            //取消事件冒泡
            if (e && e.stopPropagation) { // 因此它支持W3C的stopPropagation()方法　
                e.stopPropagation();
            } else { //否则，我们需要使用IE的方式来取消事件冒泡   　　
                window.event.cancelBubble = true;
            }
            $scope.recommendType = recommendType;
            $scope.params.RecommendType = recommendType;
        };

        $scope.gotoRecFri = function() { //推荐好友
            var cifName = $scope.loginInfo.CifName;
            var userSeq = $scope.loginInfo.UserSeq;
            $scope.goto('appOther.RecommendFriend', { "name": cifName, "seq": userSeq });
        }
        
        $scope.query = function(type) { // 查询
            $scope.regiestType = type;
            $scope.params.RegiestType=$scope.regiestType;
            $remote.post("RecommendQry.do",$scope.params, function(data) {
                $scope.resultData = data;
                $scope.list = data.List;
            });
        };

        $scope.smsWei = function() {//召唤TA
            $scope.dialog = true;
        };
        $scope.smsWei1 = function() {//答谢TA
            $scope.dialog1 = true;
        };
        $scope.closeDialog = function() {
            $scope.dialog = false;
        };
        $scope.closeDialog1 = function() {
            $scope.dialog1 = false;
        };
        $scope.goBack = function() {
            $("#doNotClickMask").hide();
            $scope.goto('app.Life');
        };

        $scope.showSelect = function() { //查询条件显示
            $("#doNotClickMask").show();
            $scope.noticeIconF = false;
            $("#MyRecommendQryForm").slideDown(500);
        };

        $scope.doQuery = function() { //确定查询范围
            $("#MyRecommendQryForm").slideUp(100);
            $scope.noticeIconF = true;
            $("#doNotClickMask").hide();
            $scope.query('0');
        };
        $scope.goLife = function() { //去生活页
            $("#doNotClickMask").hide();
            $scope.goto('app.Life')
        }
    }
]);
