/**
 *精彩活动---大转盘
 */
ibsapp.register.controller("LotteryCtrl", ["$scope", '$remote', "$os",
function($scope, $remote, $os) {
	$scope.init = function() {
		$scope.isIOS = $os.ios;
		$remote.post("JFLotteryPre.do", {}, function(data) {
			$scope.RemainNum = data.remainNum;
			$scope.getToken();
		});
	};
	//获取验证码信息
	$scope.getToken = function() {
		$remote.post("GenToken.do", {}, function(data) {
			$scope._tokenName = data;
		}, null, {noLoading : true});
	};
	//点击转盘
	$scope.clickRun = function() {
		$(".result").hide(0);
		$scope.isClick = true;
		if ($scope.RemainNum == '0') {
			$scope.ranLottery("没有抽奖机会了");
			return;
		}
		$remote.post("JFLottery.do", {
			"_tokenName" : $scope._tokenName
		}, function(data) {
			$scope.RemainNum = data.remainNum;
			if (data.jsonError) {
				$scope.ranLottery("操作频率过快，请稍候！");
				return;
			}
			if (data.zjl) {
				$("#run").rotate({
					duration : 10000, //转动时间
					angle : 0, //默认角度
					animateTo : 360 * 6 + (data.prizetype - 1) * 60 - 30, //转动角度
					callback : function() {
						$scope.ranLottery("恭喜，您中得" + data.award + "!");
						$scope.getToken();
					}
				});
			} else {
				$("#run").rotate({
					duration : 3000, //转动时间
					angle : 0, //默认角度
					animateTo : 30, //转动角度
					callback : function() {
						$scope.ranLottery("很抱歉，奖项已全部抽完");
					}
				});
			}
		});
	};
	//转动转盘后的操作
	$scope.ranLottery = function(msg) {
		$(".result").show();
		$(".result").html(msg);
		//$(".result").delay(5000).hide(0);
		$scope.isClick = false;
	};
}]); 