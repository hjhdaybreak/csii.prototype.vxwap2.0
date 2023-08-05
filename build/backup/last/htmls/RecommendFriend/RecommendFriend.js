/**
 *推荐好友
 */
ibsapp.register.controller("RecommendFriendCtrl", ['$scope', '$remote', '$timeout',
    function($scope, $remote, $timeout) {
        var cifName = $scope.getRouteParams("name");
        var userSeq = $scope.getRouteParams("seq");

        function canvasSupport() {
            return !!document.createElement('canvas').getContext;
        }

        $scope.init = function() {
            var shareText = "您的朋友" + cifName + "，邀请您加入“直销银行”（https://www.xiaocaobank.com/portal/RecommendPre1.do?UserSeq=" + userSeq + "），1分钱即可理财，享超高收益，你也快来加入吧";
            $("title").html(shareText);
            //$scope.createQR_Code();
            $scope.options = {
                render: canvasSupport() ? "canvas" : "table",
                text: "http://124.164.235.51:9104/portal/RecommendPre1.do?UserSeq=" + userSeq,
                width: 120,
                height: 120,
                src: 'images/logo2.png'
            };
        };
        $scope.QR_CodeShow = function() {
            if (!$scope.QR_Code) {
                $scope.QR_Code = true;
            } else {
                $scope.QR_Code = false;
            }
        };
        $scope.gotoLife = function() {
            $("title").html("直销银行");
            $scope.goto("app.Life");
        }
    }
]);
